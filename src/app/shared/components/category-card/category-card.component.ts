import { Component, Input } from '@angular/core';

import { CategoryInterface } from '../../structures'


@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {

  @Input() categoryItem: CategoryInterface | undefined;


  constructor() {
  }

}
