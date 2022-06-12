import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { CanComponentDeactivate } from 'common/structures';


@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate) {
    return (component.canDeactivate ? component.canDeactivate() : true);
  }

}
