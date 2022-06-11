import { Component, Input } from '@angular/core';



@Component({
  selector: 'brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent {

  @Input() brandItem: any | undefined;


  constructor() {
  }

}
