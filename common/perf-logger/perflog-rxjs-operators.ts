import { Observable } from 'rxjs';

import { PerfLogManager } from './perflog-manager';


/**
 * Logs the performance of Observables (from the moment it's subscribed to to the moment
 * it first emits - useful for Observables that emit only once and complete like HTTP requests)
 *
 * @param key The unique key/id for this perfLog. Should be the same key used on the logPerfInit call.
 * @param actionId a unique actionId that we want to associate with this system-under-test
 * @param checkSuccess Custom function to check if the next(response) is to be considered a success or not.
 * Example: A http requests that always returns 200 OK but the response contents can indicate errors.
 */

export const logPerformance = (key: string, actionId?: string, checkSuccess?: (x: any) => boolean) => {

  return (source) => {
    return new Observable((subscriber) => {
      PerfLogManager.logPerfInit(key, actionId, false);

      return source.subscribe(x => {
        if (!checkSuccess || checkSuccess(x)) {
          PerfLogManager.logPerfEnd(key, true);
        } else {
          PerfLogManager.logPerfEnd(key, false);
        }
        subscriber.next(x);
      }, (err) => {
        subscriber.error(err);
        PerfLogManager.logPerfEnd(key, false);
      }, () => {
        subscriber.complete();
      });
    });
  };

};
