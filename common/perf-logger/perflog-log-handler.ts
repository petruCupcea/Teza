import { PerfLogHandlerModel, PerfLogItem } from './models';


export class PerfLogHandler implements PerfLogHandlerModel {

  constructor() {
  }


  // eslint-disable-next-line unused-imports/no-unused-vars
  handleLog(item: PerfLogItem) {
    // const message = `Finished method '${item.name}';  ActionId: ${item.actionId}; Success: ${item.success}; ` +
    // `Date: ${item.startDate.toISOString()}; Time: ${item.timeTaken}ms.`;
    // console.log(message);
  }

}
