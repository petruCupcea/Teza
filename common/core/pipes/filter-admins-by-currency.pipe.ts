import { Pipe, PipeTransform } from '@angular/core';

import { AdministratorRecord, SearchedCurrency } from '../../structures';


@Pipe({
  name: 'filterByCurrency',
})
export class FilterAdminsByCurrencyPipe implements PipeTransform {

  transform(list: Array<AdministratorRecord>, searchedCurrency: Array<SearchedCurrency>): Array<AdministratorRecord> {
    if (!list) {
      return list;
    }

    return this.filterAdministrators(list, searchedCurrency);
  }


  private filterAdministrators(list: Array<AdministratorRecord>, searchedCurrency: Array<SearchedCurrency>): Array<AdministratorRecord> {
    const filteredAdmins = [];
    for (const item of list) {
      const adminWithFunds = this.filterByCurrency(item, searchedCurrency);
      if (adminWithFunds) {
        filteredAdmins.push(adminWithFunds);
      }
    }

    return filteredAdmins;
  }


  private filterByCurrency(administrator: AdministratorRecord, searchedCurrency: Array<SearchedCurrency>): AdministratorRecord {
    const fundList = [];
    let hasFund = false;


    for (const fundListItem of administrator.fundList) {
      for (const searchedCurrencyItem of searchedCurrency) {
        const fundCurrency = fundListItem.currencyId.toLowerCase();
        if (fundCurrency.indexOf(searchedCurrencyItem.label.toLowerCase()) >= 0) {
          fundList.push(fundListItem);
          hasFund = true;
        }
      }
    }

    if (hasFund) {
      return {
        administratorId: administrator.administratorId,
        administratorName: administrator.administratorName,
        fundList: fundList,
      };
    }
  }

}
