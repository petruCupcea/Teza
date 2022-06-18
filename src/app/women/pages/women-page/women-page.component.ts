import { Component, OnInit } from '@angular/core';
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "../../../../../common/core/classes";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


@Component({
  selector: 'women-page',
  templateUrl: './women-page.component.html',
  styleUrls: ['./women-page.component.scss']
})
export class WomenPageComponent extends BaseComponent implements OnInit {

  requestInProgress: boolean;
  requestsDone: Array<boolean> | undefined;
  categoryList: Array<{name: string, caption: string, src: string}> | undefined;
  brandList: Array<{brandName: string, caption: string, src: string}> | undefined;


  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    super();
    this.requestInProgress = true;
    this.requestsDone = [false];
  }


  ngOnInit() {
    this.setCategoryList();
    this.setBrandList();
  }


  goToShopList(title: string) {
    this.router.navigate(['../shop-list'], {queryParams: {title: title}})
  }


  private allRequestsDone(value: boolean) {
    this.requestsDone.push(value);
    if (this.requestsDone[1] && this.requestsDone[2]) {
      this.requestInProgress = false;
    }
  }


  private setCategoryList() {
    this.http.get('api/categoryListWomen').pipe(takeUntil(this.onDestroy)).subscribe((value: any) => {
      this.categoryList = value;
      this.allRequestsDone(true);
    });
  }


  private setBrandList() {
    this.http.get('api/brandListWomen').pipe(takeUntil(this.onDestroy)).subscribe((value: any) => {
      this.brandList = value;
      this.allRequestsDone(true);
    });
  }

}
