export class PerfLogItem {

  name: string;
  actionId: any;
  success: boolean;
  startDate: Date;
  timeTaken: number;


  constructor(name: string, actionId: any, success: boolean, startDate: Date, timeTaken: number) {
    this.name = name;
    this.actionId = actionId;
    this.success = success;
    this.startDate = startDate;
    this.timeTaken = timeTaken;
  }

}
