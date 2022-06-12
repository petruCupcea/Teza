import { CommonModule } from '@angular/common';
import { CookieModule, CookieService } from 'ngx-cookie';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  AccountsFilterByBalancePipe,
  AmountPipe,
  AmountWithoutDecimalsPipe,
  CalculatePercentPipe,
  DateWrapperPipe,
  FilterAdministratorsPipe,
  FilterAdminsByCurrencyPipe,
  FilterByPipe,
  FilterFundsPipe,
  FormatIbanByTokenIndexPipe,
  FxRateDecimalsPipe,
  MarkBoldStringPartPipe,
  MonthNamePipe,
  OrderByAdministratorPipe,
  RemoveWhiteSpacePipe,
  SafeSanitizerPipe,
  SearchByPipe,
  SecondsToMinutesPipe,
  ShortenIbanPipe,
  TransformToCssBgPipe,
} from './pipes';
import {
  AuthService,
  CanDeactivateGuard,
  ChartDataService,
  CookieWrapper,
  CountdownTimerService,
  DataList,
  DownloadService,
  ExpiredPasswordService,
  RouteGuardService,
  ScrollTo,
  SelectableCollectionService,
  SessionService,
  SessionTimerService,
  UserAccountsService,
  UserDataService,
} from './services';
import { Environment } from './classes';


export const environmentFactory = () => {
  return new Environment({});
};


@NgModule({
  imports: [
    CommonModule,
    CookieModule.forRoot(),
  ],
  declarations: [
    AccountsFilterByBalancePipe,
    AmountPipe,
    AmountWithoutDecimalsPipe,
    CalculatePercentPipe,
    DateWrapperPipe,
    FilterAdministratorsPipe,
    FilterAdminsByCurrencyPipe,
    FilterByPipe,
    FilterFundsPipe,
    FormatIbanByTokenIndexPipe,
    FxRateDecimalsPipe,
    MarkBoldStringPartPipe,
    MonthNamePipe,
    OrderByAdministratorPipe,
    RemoveWhiteSpacePipe,
    ShortenIbanPipe,
    TransformToCssBgPipe,
    SafeSanitizerPipe,
    SearchByPipe,
    SecondsToMinutesPipe,
  ],
  exports: [
    AccountsFilterByBalancePipe,
    AmountPipe,
    AmountWithoutDecimalsPipe,
    DateWrapperPipe,
    FilterAdministratorsPipe,
    FilterAdminsByCurrencyPipe,
    FilterByPipe,
    FilterFundsPipe,
    FormatIbanByTokenIndexPipe,
    FxRateDecimalsPipe,
    MarkBoldStringPartPipe,
    MonthNamePipe,
    OrderByAdministratorPipe,
    RemoveWhiteSpacePipe,
    ShortenIbanPipe,
    TransformToCssBgPipe,
    SafeSanitizerPipe,
    CalculatePercentPipe,
    SearchByPipe,
    SecondsToMinutesPipe,
  ],
})
export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AccountsFilterByBalancePipe,
        AmountPipe,
        AmountWithoutDecimalsPipe,
        CalculatePercentPipe,
        DateWrapperPipe,
        FilterAdministratorsPipe,
        FilterAdminsByCurrencyPipe,
        FilterByPipe,
        FilterFundsPipe,
        FormatIbanByTokenIndexPipe,
        FxRateDecimalsPipe,
        MarkBoldStringPartPipe,
        MonthNamePipe,
        OrderByAdministratorPipe,
        RemoveWhiteSpacePipe,
        ShortenIbanPipe,
        TransformToCssBgPipe,
        AuthService,
        DataList,
        SelectableCollectionService,
        SessionService,
        SessionTimerService,
        ExpiredPasswordService,
        SafeSanitizerPipe,
        SecondsToMinutesPipe,
        CanDeactivateGuard,
        ChartDataService,
        ScrollTo,
        CountdownTimerService,
        DownloadService,
        RouteGuardService,
        UserAccountsService,
        UserDataService,
        {
          provide: Environment,
          useFactory: environmentFactory,
        }, {
          provide: CookieWrapper,
          useClass: CookieWrapper,
          deps: [CookieService],
        },
      ],
    };
  }


  static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }

}
