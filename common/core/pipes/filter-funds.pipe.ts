import { Pipe, PipeTransform } from '@angular/core';

import { AdministratorRecord } from '../../structures';


@Pipe({
  name: 'searchByFundName',
})
export class FilterFundsPipe implements PipeTransform {

  transform(administratorsList: Array<AdministratorRecord>, search: string): Array<AdministratorRecord> {
    if (!administratorsList || !search) {
      return administratorsList;
    }

    return this.filterBySearch(administratorsList, search);
  }


  private filterBySearch(administratorsList: Array<AdministratorRecord>, search: string): Array<AdministratorRecord> {
    if (!search) {
      return administratorsList;
    }
    const filteredFundsBySearch = [];
    for (const administratorsListItem of administratorsList) {
      const fundList = [];
      let hasFund = false;

      if (administratorsListItem) {
        for (const fundListItem of administratorsListItem.fundList) {
          const fundName = fundListItem.fundName.toLowerCase();
          if (fundName.indexOf(search.toLowerCase()) >= 0) {
            fundList.push(fundListItem);
            hasFund = true;
          }
        }
      }

      if (hasFund) {
        filteredFundsBySearch.push({
          administratorId: administratorsListItem.administratorId,
          administratorName: administratorsListItem.administratorName,
          fundList: fundList,
        });
      }
    }

    return filteredFundsBySearch;
  }

}
