import { PerfLogManager } from './perflog-manager';
import { PerfLogMethod } from './models';


/**
 * If decorator is used on a class: Logs the time it takes for all class methods to complete (or a subset of them).
 *
 * If decorator is used on a method: Logs the time it takes for the method to complete
 *
 * Methods that return Observables should not be included here and their performance logging should be
 * done either using PerfLogManager.logPerfInit() and PerfLogManager.logPerfEnd() or the Observable operator '.logPerformance()'.
 *
 * @param nameOrMethodNamesToLog If class decorator: Array of method's names that are to be logged; if undefined, all methods are logged.
 * If method decorator: Name to be used in the logs to reference this method; Otherwise, 'Class.functionName' is used.
 * @param newLogMethod Override of logMethod - the defaultLogMethod simply writes to console.log()
 */
export const LogPerformance = (nameOrMethodNamesToLog?: string | Array<string>, newLogMethod?: PerfLogMethod) => {
  return (...args: Array<any>) => {
    switch (args.length) {
    case 1:
      return logClassPerformance.apply(this, [...args, nameOrMethodNamesToLog, newLogMethod]);
    // case 2:
    //  return logProperty.apply(this, args);
    case 3:
      if (typeof args[2] === 'number') {
        throw new Error('LogPerformance decorator is not valid here!');
        // return logParameter.apply(this, args);
      }

      return logMethodPerformance.apply(this, [...args, nameOrMethodNamesToLog, newLogMethod]);
    default:
      throw new Error('LogPerformance decorator is not valid here!');
    }
  };
};


/**
 * Disable the Performance Logging feature for this method. To be used inside classes decorated with @LogPerformance()
 */
export const DisableLogPerformance = () => {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    descriptor = descriptor || Object.getOwnPropertyDescriptor(target, propertyKey);

    const originalMethod = descriptor.value;
    originalMethod.__perfLogCompleted = true;

    return descriptor;
  };
};


const logClassPerformance = (target, methodNamesToLog?: Array<string>, newLogMethod?: PerfLogMethod) => {
  Object.keys(target.prototype).filter((methodName: string): boolean => {
    return !methodNamesToLog || methodNamesToLog.indexOf(methodName) !== -1;
  }).forEach((methodName: string) => {
    const originalMethod = target.prototype[methodName];
    const name = target.prototype.constructor.name + '.' + methodName;

    // set by method logger decorator for disabling the method log
    if (typeof (originalMethod) !== 'function' || originalMethod.__perfLogCompleted === true) {
      return;
    }

    target.prototype[methodName] = getPerfLogPatchedMethod(name, originalMethod, newLogMethod);
  });
};


const logMethodPerformance = (
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>,
  name?: string,
  newLogMethod?: PerfLogMethod,
) => {
  name = name || getObjectClass(target) + '.' + propertyKey;
  descriptor = descriptor || Object.getOwnPropertyDescriptor(target, propertyKey);

  const originalMethod = descriptor.value;
  descriptor.value = getPerfLogPatchedMethod(name, originalMethod, newLogMethod);
  descriptor.value.__perfLogCompleted = true;
};


const getPerfLogPatchedMethod = (name: string, method: (args?: any) => void, newLogMethod: PerfLogMethod) => {
  return (...args: Array<any>) => {
    PerfLogManager.logPerfInit(name);

    try {
      const result = method.apply(this, args);

      if (result && result.then) { // if promise
        return result.then((val) => {
          PerfLogManager.logPerfEnd(name, true, newLogMethod);

          return val;
        }).catch((e) => {
          PerfLogManager.logPerfEnd(name, false, newLogMethod);
          throw e;
        });
      } else { // if synchronous method
        PerfLogManager.logPerfEnd(name, true, newLogMethod);

        return result;
      }
    } catch (ex) {
      PerfLogManager.logPerfEnd(name, false, newLogMethod);
      throw ex;
    }
  };
};


const getObjectClass = (target: any) => {
  if (target && target.constructor && target.constructor.toString) {
    const arr = target.constructor.toString().match(/function\s*(\w+)/);

    if (arr && arr.length === 2) {
      return arr[1];
    }
  }

  return undefined;
};
