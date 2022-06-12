import { Pipe, PipeTransform } from '@angular/core';

import { AdministratorRecord, FundRecord } from '../../structures';


@Pipe({
  name: 'orderByAdministrators',
})
export class OrderByAdministratorPipe implements PipeTransform {

  transform(list: Array<AdministratorRecord>): Array<AdministratorRecord> {
    if (!list) {
      return list;
    }

    return this.sortFundByPortfolio(list);
  }


  private sortFundByPortfolio(list: Array<AdministratorRecord>): Array<AdministratorRecord> {
    const adminWithSubscription = [];
    const adminWithoutSubscription = [];
    for (const listItem of list) {
      const funds = [];
      const noPortfolioFunds = [];
      for (const fundListItem of listItem.fundList) {
        if (fundListItem.portfolioValue) {
          funds.push(fundListItem);
        } else {
          noPortfolioFunds.push(fundListItem);
        }
      }

      funds.sort((firstObject: FundRecord, secondObject: FundRecord) => {
        return (secondObject.portfolioValue - firstObject.portfolioValue);
      });

      listItem.fundList = [...funds, ...noPortfolioFunds];
      if (funds.length) {
        adminWithSubscription.push(listItem);
      } else {
        adminWithoutSubscription.push(listItem);
      }
    }

    return this.orderAdministrators(adminWithSubscription, adminWithoutSubscription);
  }


  private orderAdministrators(list1: Array<AdministratorRecord>, list2: Array<AdministratorRecord>): Array<AdministratorRecord> {
    list1.sort((a: AdministratorRecord, b: AdministratorRecord) => {
      return (a.administratorName > b.administratorName) ? 1 : -1;
    });

    list2.sort((a: AdministratorRecord, b: AdministratorRecord) => {
      return (a.administratorName > b.administratorName) ? 1 : -1;
    });

    list1.sort((a: AdministratorRecord, b: AdministratorRecord) => {
      return (a.administratorOrder - b.administratorOrder);
    });

    list2.sort((a: AdministratorRecord, b: AdministratorRecord) => {
      return (a.administratorOrder - b.administratorOrder);
    });

    return ([...list1, ...list2]);
  }

}
