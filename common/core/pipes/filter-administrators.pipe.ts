import { Pipe, PipeTransform } from '@angular/core';

import { AdministratorRecord, SearchedAdministrators } from 'common/structures';


@Pipe({
  name: 'filterByAdministratorName',
})
export class FilterAdministratorsPipe implements PipeTransform {

  transform(list: Array<AdministratorRecord>, searchedList: Array<SearchedAdministrators>): Array<AdministratorRecord> {
    if (!list || !searchedList) {
      return list;
    }

    return this.filterByAdministrator(list, searchedList);
  }


  private filterByAdministrator(list: Array<AdministratorRecord>, searchedList: Array<SearchedAdministrators>): Array<AdministratorRecord> {
    if (!searchedList.length) {
      return [];
    }
    const filteredAdministrators = [];

    for (const listItem of list) {
      for (const searchedItem of searchedList) {
        if (listItem.administratorId === searchedItem.administratorId) {
          filteredAdministrators.push(listItem);
        }
      }
    }

    return filteredAdministrators;
  }

}
