import { AfterViewInit, Directive, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { PerfLogManager } from 'common/perf-logger';


@Directive()
export class BaseComponent implements AfterViewInit, OnDestroy {

  private readonly _onDestroy: Subject<any>;


  constructor() {
    this._onDestroy = new Subject<any>();
    PerfLogManager.logPerfInit(this.constructor.name + '.ViewInit');
  }


  get onDestroy(): Observable<any> {
    return this._onDestroy.asObservable();
  }


  ngAfterViewInit() {
    PerfLogManager.logPerfEnd(this.constructor.name + '.ViewInit', true);
  }


  ngOnDestroy() {
    this._onDestroy.next();
  }

}
