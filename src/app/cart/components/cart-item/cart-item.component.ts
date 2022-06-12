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
     this.cartItem.price += (this.cartItem.price/this.cartItem.quantity);
    this.cartItem.quantity += 1;

     this.http.patch('api/cart-items/'+ this.cartItem.id, {
       quantity: this.cartItem.quantity,
       price: this.cartItem.price,
     })
  }


  removeItem() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.price -= (this.cartItem.price/this.cartItem.quantity);
      this.cartItem.quantity -= 1;

      return;
    }
    this.deleteItem();
  }


  deleteItem() {
    // this.http.delete('api/cart-items/' + this.cartItem.id);
  }

}
