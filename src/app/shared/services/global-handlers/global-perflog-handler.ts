import { Injectable } from '@angular/core';

import { ApiClientService } from 'common/request';
import { PerfLogHandlerModel, PerfLogItem } from 'common/perf-logger/models';
import { PerfLogItemEx } from 'common/structures';

import { GlobalBaseHandler } from './global-base-handler';
import { REQUEST_DEFINITION } from '../../types';


@Injectable()
export class GlobalPerfLogHandler extends GlobalBaseHandler<PerfLogItem> implements PerfLogHandlerModel {

  constructor(apiClientService: ApiClientService) {
    super(apiClientService, {
      storeKey: 'PerfLogs',
      maxSize: 100,
      consideredFullSize: 50,
      timerIntervalInMs: 60 * 1000,
      apiRequestKey: REQUEST_DEFINITION.KEY_LOG_PERF,
    });
  }


  handleLog(item: PerfLogItem) {
    const itemEx = new PerfLogItemEx(item);
    this.ringBuffer.push(itemEx);
  }

}
