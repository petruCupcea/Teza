import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

import { CartItemInterface } from "../../structures/cart-item.interface";
import { BaseComponent } from "../../../../../common/core/classes";

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent extends BaseComponent implements OnInit {

  cartList: Array<CartItemInterface>;
  requestInProgress: boolean;
  totalPrice: string;

  constructor(private readonly http: HttpClient) {
    super();
    this.requestInProgress = false;
    this.cartList = undefined;
  }


  ngOnInit() {
    this.setCartList();
  }


  setSubTotal() {
    let price = 0;
    this.cartList.forEach((item) => {
      if (item?.price) {
        price += item?.price;
      }
    })

    this.totalPrice = price.toFixed(2);
  }


  private setCartList() {
    this.requestInProgress = true;
    this.http.get('api/cart-items').pipe(takeUntil(this.onDestroy)).subscribe((value: any) => {
      this.cartList = value;
      this.requestInProgress = false;
      this.setSubTotal();
    });
  }

}
