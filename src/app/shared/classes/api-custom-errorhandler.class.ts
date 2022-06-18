import { Injector } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Router } from '@angular/router';

import {
  ApiError,
  ApiErrorHandler,
  API_ERROR_TYPE_ALERT_POPUP,
  API_ERROR_TYPE_NOSESSION,
  API_ERROR_TYPE_SYSTEM_ERROR,
} from 'common/request';
import { SystemService } from 'common/system';


export class ApiCustomErrorHandler extends ApiErrorHandler {

  constructor(
    private readonly system: SystemService,
    private readonly injector: Injector,
  ) {
    super();
    this.registerNoSkipErrorHandler(this.checkTypeNoSessionError());

    this.registerErrorHandler(this.checkTypeAlertError());
    this.registerErrorHandler(this.checkTypeSystemError());
    this.registerErrorHandler(this.defaultError());
  }


  get router(): Router {
    return this.injector.get(Router);
  }


  private checkTypeAlertError(): (apiError: ApiError) => Observable<ApiError> {
    return (apiError: ApiError) => {
      if (apiError && apiError.type && apiError.type === API_ERROR_TYPE_ALERT_POPUP) {
        setTimeout(() => {
          this.system.alert(apiError.error);
        }, 1);

        return observableThrowError(apiError);
      }

      return undefined;
    };
  }


  private checkTypeSystemError(): (apiError: ApiError) => Observable<ApiError> {
    return (apiError: ApiError) => {
      if (apiError && apiError.type && apiError.type === API_ERROR_TYPE_SYSTEM_ERROR) {
        setTimeout(() => {
          this.system.alert(apiError.error);
        },1);

        return observableThrowError(apiError);
      }

      return undefined;
    };
  }


  private checkTypeNoSessionError(): (apiError: ApiError) => Observable<ApiError> {
    return (apiError: ApiError) => {
      if (apiError && apiError.type && apiError.type === API_ERROR_TYPE_NOSESSION) {
        setTimeout(() => {
          this.router.navigate(['/login']);
          this.system.alert(apiError.error);
        },1);

        return observableThrowError(apiError);
      }

      return undefined;
    };
  }


  private defaultError(): (apiError: ApiError) => Observable<ApiError> {
    return (apiError: ApiError) => {
      if (this.isDefaultErrorCondition(apiError)) {
        setTimeout(() => {
          this.system.alert({message: '[SYSTEM ERROR]'});
        }, 1);

        return observableThrowError(apiError);
      }

      return undefined;
    };
  }


  private isDefaultErrorCondition(apiError: ApiError): boolean {
    if (apiError && apiError.type) {
      const notAlertPopupError = (apiError.type !== API_ERROR_TYPE_ALERT_POPUP);
      const notNoSessionError = (apiError.type !== API_ERROR_TYPE_NOSESSION);
      const notSystemError = (apiError.type !== API_ERROR_TYPE_SYSTEM_ERROR);

      return (notAlertPopupError && notNoSessionError && notSystemError);
    }

    return false;
  }

}
