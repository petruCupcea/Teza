import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "../../../../../common/core/classes";
import { CartItemInterface } from "../../structures/cart-item.interface";


@Component({
  selector: 'checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent extends BaseComponent implements OnInit {

  totalPrice: string;
  checkoutItems: Array<CartItemInterface>;


  constructor(private readonly route: ActivatedRoute) {
    super();
  }


  ngOnInit() {
    this.getRouteData();
  }


  private getRouteData() {
    this.route.queryParams
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params: any) => {
        this.totalPrice = params.total;
      })
  }

}
