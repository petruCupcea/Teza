import { Component, Input } from '@angular/core';



@Component({
  selector: 'asos-card',
  templateUrl: './asos-card.component.html',
  styleUrls: ['./asos-card.component.scss']
})
export class AsosCardComponent {

  @Input() cardItem: any | undefined;


  constructor() {
  }

}
