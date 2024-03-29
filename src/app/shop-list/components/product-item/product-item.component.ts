import { Component, Input } from '@angular/core';


@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input() productItem: any;

  setFavorite() {
    this.productItem.favorite = !this.productItem?.favorite;
  }

}
