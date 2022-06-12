import {
  Map,
  PerfLog,
  PerfLogFlatStats,
  PerfLogHandlerModel,
  PerfLogItem,
  PerfLogMethod,
  Sut,
} from './models';
import { PerfLogHandler } from './perflog-log-handler';


export class PerfLogManager {

  private static perfLogHandler: PerfLogHandlerModel;
  private static currentActionId: any;
  private static readonly perfLogs: Array<PerfLog> = [];
  private static readonly logsIndexMap: Map<number> = {};
  private static readonly sutsMap: Map<Sut> = {};


  // Used as a "static constructor"
  static initialize() {
    this.perfLogHandler = new PerfLogHandler();
  }


  /**
   * Global override of perfLogHandler - the default perfLogHandler implementation simply writes to console.log()
   *
   * @param perfLogHandler the new perfLogHandler
   */
  static setLogHandler(perfLogHandler: PerfLogHandlerModel) {
    this.perfLogHandler = perfLogHandler;
  }


  /**
   * Gets the currently active actionId
   */
  static getCurrentActionId(): any {
    return this.currentActionId;
  }


  /**
   * Sets a new actionId that will be cleared once the current code-under-test completes.
   *
   * @param actionId the new actionId
   */
  static setCurrentActionId(actionId: any) {
    this.currentActionId = actionId || undefined;
  }


  /**
   * Initializes a performance logging system-under-test with the given key
   *
   * @param key the unique key/id for this perfLog. The same key needs to be used on the logPerfEnd call.
   * @param actionId a unique actionId that we want to associate with this system-under-test
   * @param setCurrentAction whether to associate this actionId with this system-under-test only,
   * or make it the current active actionId for any follow up async calls that happen
   */
  static logPerfInit(key: string, actionId?: any, setCurrentAction = true) {
    PerfLogManager.getLog(key);

    const sut = {
      startDate: new Date(),
      startTime: performance.now(),
      actionId: actionId || this.getCurrentActionId(),
    };

    this.sutsMap[key] = <Sut> sut;
    if (setCurrentAction) {
      this.setCurrentActionId(this.sutsMap[key].actionId);
    }
  }


  /**
   * Finalizes the performance logging for the system-under-test with the given key;
   * If a matching logPerfInit(key) wasn't previously called, no action is taken.
   *
   * @param key the unique key/id for this perfLog. Should be the same key used on the logPerfInit call.
   * @param success whether the system-under-test executed successfuly or not.
   * @param newLogMethod new log method.
   */
  static logPerfEnd(key: string, success: boolean, newLogMethod?: PerfLogMethod) {
    const log = PerfLogManager.getLog(key);
    const sut: Sut = this.sutsMap[key];

    if (log && sut) {
      const timeTaken = performance.now() - this.sutsMap[key].startTime;

      if (newLogMethod) {
        newLogMethod(new PerfLogItem(key, sut.actionId, success, this.sutsMap[key].startDate, timeTaken));
      } else {
        this.perfLogHandler.handleLog(new PerfLogItem(key, sut.actionId, success, this.sutsMap[key].startDate, timeTaken));
      }

      if (success) {
        log.appendSuccessTime(timeTaken);
      } else {
        log.appendFailureTime(timeTaken);
      }

      this.removeFromSut(key);
    }
  }


  static getLog(key: string): PerfLog {
    if (this.logsIndexMap.hasOwnProperty(key)) {
      return this.perfLogs[this.logsIndexMap[key]];
    }
    const perfLog = new PerfLog(key);
    const index = this.perfLogs.length;
    this.perfLogs[index] = perfLog;
    this.logsIndexMap[key] = index;

    return perfLog;
  }


  static clearLogs() {
    this.perfLogs.forEach((item) => {
      item.clear();
    });
  }


  static getFlatStats(name: string, perfLog: PerfLog): PerfLogFlatStats {
    return {
      name: perfLog.getName(),
      successes: perfLog.getSuccesses(),
      successMin: perfLog.getSuccessMin(),
      successMax: perfLog.getSuccessMax(),
      successAverage: perfLog.getSuccessAverage(),
      successStandardDeviation: perfLog.getSuccessStandardDeviation(),
      failures: perfLog.getFailures(),
      failureMin: perfLog.getFailureMin(),
      failureMax: perfLog.getFailureMax(),
      failureAverage: perfLog.getFailureAverage(),
      failureStandardDeviation: perfLog.getFailureStandardDeviation(),
    };
  }


  private static removeFromSut(key: string) {
    delete this.sutsMap[key];

    // if after 250ms, the SUTs is empty, clear the currently active actionId
    // this is because some functions are synchronous but trigger other functions once they complete
    setTimeout(() => {
      if (Object.keys(this.sutsMap).length === 0) {
        this.setCurrentActionId(undefined);
      }
    }, 250);
  }

}


PerfLogManager.initialize(); // call "static constructor"
