import { Component } from '@angular/core';
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "../../../../../common/core/classes";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
  selector: 'shop-list',
  templateUrl: './shop-list-page.component.html',
  styleUrls: ['./shop-list-page.component.scss']
})
export class ShopListPageComponent extends BaseComponent {

  pageTitle: string;
  productList: any;
  requestInProgress: boolean;
  formGroup: FormGroup;
  searchValue: string;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
    formBuilder: FormBuilder,
  ) {
    super();
    this.formGroup = formBuilder.group({
      search: [undefined],
    })
  }


  ngOnInit() {
    this.getPageTitle();
    this.setProductList();
    this.formGroup.get('search').valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value) => {
        this.searchValue = value;
      })
  }


  trackByFn(index: number, item: {key: string; items: Array<any>}): string {
    return item.key;
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
