import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

import { CartItemInterface } from "../../structures/cart-item.interface";
import { BaseComponent } from "../../../../../common/core/classes";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent extends BaseComponent implements OnInit {

  cartList: Array<CartItemInterface>;
  requestInProgress: boolean;
  totalPrice: string;


  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
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


  deleteItemById(id: string) {
    this.cartList.forEach((item,index) => {
      if (id === item.id) {
        this.cartList.splice(index, 1);
        this.setSubTotal();
      }
    })
  }


  sendToCheckout() {
    this.router.navigate(['../checkout'], {queryParams: {total: this.totalPrice}})
  }


  private setCartList() {
    this.requestInProgress = true;
    this.http.get('http://localhost:3000/cartItems').pipe(takeUntil(this.onDestroy)).subscribe((value: any) => {
      this.cartList = value;
      this.requestInProgress = false;
      this.setSubTotal();
    });
  }

}
