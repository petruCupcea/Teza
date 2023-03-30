import { Component, OnInit } from '@angular/core';
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "../../../../../common/core/classes";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


@Component({
  selector: 'men-page',
  templateUrl: './men-page.component.html',
  styleUrls: ['./men-page.component.scss']
})
export class MenPageComponent extends BaseComponent implements OnInit {

  requestInProgress: boolean;
  requestsDone: Array<boolean> | undefined;
  categoryList: Array<{name: string, caption: string, src: string}> | undefined;
  brandList: Array<{brandName: string, caption: string, src: string}> | undefined;
  circularList: Array<{title: string, src: string}>;


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
    this.setCircularList();
  }


  goToShopList(title: string) {
    this.router.navigate(['../shop-list'], {queryParams:{title: title}})
  }


  private allRequestsDone(value: boolean) {
    this.requestsDone.push(value);
    if (this.requestsDone[1] && this.requestsDone[2] && this.requestsDone[3]) {
      this.requestInProgress = false;
    }
  }


  private setCategoryList() {
    this.http.get('http://localhost:3000/categoryList').pipe(takeUntil(this.onDestroy)).subscribe((value: any) => {
      this.categoryList = value;
      this.allRequestsDone(true);
    });
  }


  private setBrandList() {
    this.http.get('http://localhost:3000/brandList').pipe(takeUntil(this.onDestroy)).subscribe((value: any) => {
      this.brandList = value;
      this.allRequestsDone(true);
    });
  }


  private setCircularList() {
    this.http.get('http://localhost:3000/circularList').pipe(takeUntil(this.onDestroy)).subscribe((value: any) => {
      this.circularList = value;
      this.allRequestsDone(true);
    });
  }

}
