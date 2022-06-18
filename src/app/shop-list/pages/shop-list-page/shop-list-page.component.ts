import { Component } from '@angular/core';
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "../../../../../common/core/classes";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'shop-list',
  templateUrl: './shop-list-page.component.html',
  styleUrls: ['./shop-list-page.component.scss']
})
export class ShopListPageComponent extends BaseComponent {

  pageTitle: string;
  productList: any;
  requestInProgress: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
  ) {
    super();
  }


  ngOnInit() {
    this.getPageTitle();
    this.setProductList();
  }

  private getPageTitle() {
    this.route.queryParams
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        this.pageTitle = params['title'];
      })
  }


  private setProductList() {
    this.requestInProgress = true;
    this.http.get('api/shopList').pipe(takeUntil(this.onDestroy)).subscribe((value: any) => {
      this.productList = value;
      this.requestInProgress = false;
    });
  }

}
