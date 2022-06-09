const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');


const hostname = 'localhost';
const appName = 'ASOS';
let port = 5000;
let currentScreenSharingImage = '';
let currentPointerPosition = {};


function createServer() {
  const server = http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      let allowOrigin = getOrigin(request) || '*';

      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Access-Control-Allow-Origin', allowOrigin);
      response.setHeader('Access-Control-Allow-Headers', [
        'Content-Type',
        'GTK-Operation',
        'GTK-Captcha',
        'GTK-Tab-Id',
        'X-XSRF-TOKEN',
        'GTK-Timezone-Offset',
        'GTK-Timezone-Region',
      ]);
      response.setHeader('Access-Control-Allow-Credentials', 'true');

      body = Buffer.concat(body).toString();
      const parsedUrlRef = url.parse(request.url);
      if (parsedUrlRef.path.indexOf('/assets/documents/') > -1) {
        const filePath = getFilePath('/app-' + appName + parsedUrlRef.path);
        const splitFilePath = filePath.split(path.sep);
        const filename = splitFilePath[splitFilePath.length - 1];
        let fileBinary;
        try {
          fileBinary = fs.readFileSync(filePath, 'binary');
          response.setHeader('Content-Disposition', 'attachment; filename=' + filename);
          response.setHeader('Content-Length', fileBinary.length);
          response.write(fileBinary, 'binary');
          response.end();
        } catch {
          response.setHeader('Content-Disposition', 'attachment; filename=file-not-found-in-assets.txt');
          response.setHeader('Content-Length', 0);
          response.write('',  'binary');
          response.end();
        }

        return;
      }

      if (parsedUrlRef.path === '/upload_processor') {
        response.write(JSON.stringify({"fileId":"288"}));
        response.end();
      } else if (parsedUrlRef.path === '/get_screen_sharing') {
        const payload = (currentScreenSharingImage ? {image: currentScreenSharingImage} : {});
        if (body) {
          currentPointerPosition = JSON.parse(body);
        }
        response.write(buildResponse('success', payload));
        response.end();
      } else if (parsedUrlRef.path === '/screen_sharing_processor/data') {
        if (body) {
          currentScreenSharingImage = body;
        }
        const pointerPosition = JSON.stringify(currentPointerPosition.payload || {});
        response.write(pointerPosition);
        response.end();
      } else if (parsedUrlRef.path === '/screen_sharing_processor/pause') {
        response.write('{}');
        response.end();
      } else {
        triggerFlowFromLocalhost(response, getOrigin(request), body);
      }
    });
  });

  return server;
}


function listenServerOnAvailablePort() {
  const server = createServer();
  const listeningServer = server.listen(port, function() {
    console.log('\x1b[32m', `Server for ${appName} running at http://${hostname}:${port}/`, '\x1b[0m');
  });
  listeningServer.once('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      if (nextPort === 6000) {
        throw new Error('All ports from \x1b[31m5000\x1b[0m to \x1b[31m6000\x1b[0m are busy!');
      }
      console.log(`Port \x1b[31m${port}\x1b[0m busy. Trying port \x1b[32m${nextPort}\x1b[0m`);
      port = nextPort;
      listenServerOnAvailablePort();
    }
  });
}


function getOrigin(request) {
  if (!request || !request.headers) {
    return undefined;
  }

  let origin = request.headers.origin || request.headers.referer;

  return origin;
}


function getFilePath(urlPath) {
  return path.join(process.cwd(), urlPath);
}


function triggerFlowFromLocalhost(response, origin, body) {
  if (!body) {
    response.end();

    return;
  }

  try {
    let parsedBody;

    try {
      parsedBody = JSON.parse(body);
    } catch(e) {
      const uploadResponse =  buildResponse('success', {});
      response.write(uploadResponse);
      response.end();

      return;
    }

    const commonConfigPath = '/common/requests-config.json';
    const fullCommonConfigPath = getFilePath(commonConfigPath);
    const configPath = '/app-' + appName + '/requests-config.json';
    const fullConfigPath = getFilePath(configPath);

    readJson(fullCommonConfigPath, (err, commonConfigData) => {
      readJson(fullConfigPath, (err, configData) => {
        configData = {...configData, ...commonConfigData};
        if (!configData[parsedBody.operation]) {
          const message = 'Local server error! Operation "' + parsedBody.operation + '" not defined for "' + appName + '" app.';
          const stringData = buildResponseError(message);
          response.write(stringData);
          response.end();

          return;
        }

        if (configData[parsedBody.operation].payload) {
          const status = configData[parsedBody.operation].status || 'success';
          const payload = buildResponse(status, configData[parsedBody.operation].payload);
          response.write(payload);
          response.end();

          return;
        }

        const jsonPath = interpolateString(configData[parsedBody.operation].path, parsedBody.payload);

        if (!jsonPath) {
          const stringData = buildResponseError('Local server error! Json path not set.');
          response.write(stringData);
          response.end();

          return;
        }

        try {
          readJson(jsonPath, (err, data) => {
            const originSplit = origin.split(':');
            const port = originSplit[originSplit.length - 1];
            if (configData[parsedBody.operation].status) {
              data.status = configData[parsedBody.operation].status;
            }
            data.devJsonPath = jsonPath;
            let stringData = JSON.stringify(data);
            stringData = stringData.replace(/localhost:4200/g, 'localhost:' + port);
            response.write(stringData);
            response.end();
          });
        } catch(err) {
          const stringData = buildResponseError('Local server error! ' + err.toString());
          response.write(stringData);
          response.end();
        }
      });
    });

  } catch(e) {
    const error = buildResponseError('Local server error! Json file doesn\'t exist.');
    response.write(error);
    response.end();
  }
}


function interpolateString(jsonPath, payload) {
  if (!jsonPath) {
    return undefined;
  }

  const interpolationPart = jsonPath.match(/{{.*}}/);
  if (interpolationPart && interpolationPart[0]) {
    let part = interpolationPart[0];
    part = part.replace('{{', '');
    part = part.replace('}}', '');

    const tempPath = jsonPath.replace(interpolationPart[0], payload[part]);
    const finalPath = getFilePath('/app-' + appName + '/assets' + tempPath);

    if (fs.existsSync(finalPath)) {
      return finalPath;
    } else {
      jsonPath = jsonPath.replace(interpolationPart[0], '');
      jsonPath = getFilePath('/app-' + appName + '/assets' + jsonPath);

      return jsonPath;
    }
  }

  jsonPath = getFilePath('/app-' + appName + '/assets' + jsonPath);

  return jsonPath;
}


function buildResponseError(message) {
  return buildResponse('alert-popup', {message: message});
}


function buildResponse(status, payload) {
  return JSON.stringify({
    status: status,
    payload: payload
  })
}


let readJson = (jsonPath, cb) => {
  fs.readFile(require.resolve(jsonPath), (err, data) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, JSON.parse(data))
    }
  })
};


listenServerOnAvailablePort();
