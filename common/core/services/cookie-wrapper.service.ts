import { CookieOptionsProvider, CookieService, cookieServiceFactory } from 'ngx-cookie';
import { Injector } from '@angular/core';


class CookieWrapper {

  private _cookieService: CookieService;


  constructor(public cookieInstance: CookieService) {
    this._cookieService = cookieInstance;
  }


  get cookieService(): CookieService {
    return this._cookieService;
  }


  set cookieService(value: CookieService) {
    this._cookieService = value;
  }


  getCookie(cookieKey: string): string {
    if (!this._cookieService) {
      return undefined;
    }

    return this._cookieService.get(cookieKey);
  }


  setCookie(cookieKey: string, cookieValue: string, expiresDays?: number) {
    if (!this._cookieService) {
      return;
    }

    const date = new Date();
    date.setTime(date.getTime() + ((expiresDays || 1) * 24 * 60 * 60 * 1000));
    this._cookieService.put(cookieKey, cookieValue, {expires: date});
  }

}


// for direct import
const cookieService = cookieServiceFactory(new CookieOptionsProvider(undefined, Injector.create({providers: []})));
const cookieWrapper = new CookieWrapper(cookieService);


// for dependency injection
const CookieWrapperProvider = () => {
  return cookieWrapper;
};


export {
  cookieWrapper,
  CookieWrapper,
  CookieWrapperProvider,
};
