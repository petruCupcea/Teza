import { PerfLogStats } from './perflog-stats.class';


export class PerfLog {

  private readonly name: string;
  private successStats: PerfLogStats;
  private failureStats: PerfLogStats;


  static getStandardDeviation(stats: PerfLogStats): number {
    if (stats.count < 2) {
      return NaN;
    }
    const variance = stats.m2 / (stats.count - 1);

    return Math.sqrt(variance);
  }


  // online mean and standard deviation calculation
  // reference: https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm
  static getUpdatedStats(prev: PerfLogStats, updatedValue: number): PerfLogStats {
    const update = {
      count: prev.count + 1,
      min: Math.min(updatedValue, prev.min),
      max: Math.max(updatedValue, prev.max),
      mean: 0,
      m2: 0,
    };

    const delta = updatedValue - prev.mean;
    update.mean = prev.mean + (delta / update.count);

    update.m2 = prev.m2 + delta * (updatedValue - update.mean);

    return update;
  }


  constructor(name: string) {
    this.clear();
    this.name = name;
  }


  clear() {
    this.successStats = {
      count: 0,
      mean: 0,
      min: Number.MAX_VALUE,
      max: 0,
      m2: 0,
    };
    this.failureStats = {
      count: 0,
      mean: 0,
      min: Number.MAX_VALUE,
      max: 0,
      m2: 0,
    };
  }


  getName(): string {
    return this.name;
  }


  getSuccesses(): number {
    return this.successStats.count;
  }


  getFailures(): number {
    return this.failureStats.count;
  }


  getSuccessMin(): number {
    return (this.successStats.count) ? this.successStats.min : NaN;
  }


  getFailureMin(): number {
    return (this.failureStats.count) ? this.failureStats.min : NaN;
  }


  getSuccessMax(): number {
    return (this.successStats.count) ? this.successStats.max : NaN;
  }


  getFailureMax(): number {
    return (this.failureStats.count) ? this.failureStats.max : NaN;
  }


  appendSuccessTime(time: number) {
    this.successStats = PerfLog.getUpdatedStats(this.successStats, time);
  }


  appendFailureTime(time: number) {
    this.failureStats = PerfLog.getUpdatedStats(this.failureStats, time);
  }


  getSuccessAverage(): number {
    return (this.successStats.count) ? this.successStats.mean : NaN;
  }


  getFailureAverage(): number {
    return (this.failureStats.count) ? this.failureStats.mean : NaN;
  }


  getSuccessStandardDeviation(): number {
    return PerfLog.getStandardDeviation(this.successStats);
  }


  getFailureStandardDeviation(): number {
    return PerfLog.getStandardDeviation(this.failureStats);
  }

}
