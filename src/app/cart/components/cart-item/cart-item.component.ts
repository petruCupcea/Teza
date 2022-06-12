import { Component, Input } from '@angular/core';
import { CartItemInterface } from "../../structures/cart-item.interface";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {

  @Input() cartItem: CartItemInterface;


  constructor(private readonly http: HttpClient) {
  }


  addItem() {
     this.cartItem.quantity += 1;
     this.cartItem.price += (this.cartItem.price/this.cartItem.quantity);
  }


  removeItem() {
    this.cartItem.quantity -= 1;
    this.cartItem.price -= (this.cartItem.price/this.cartItem.quantity);
  }


  deleteItem() {
  }

}
