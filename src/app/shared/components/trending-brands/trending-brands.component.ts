import { Component } from '@angular/core';


@Component({
  selector: 'trending-brands',
  templateUrl: './trending-brands.component.html',
  styleUrls: ['./trending-brands.component.scss']
})
export class TrendingBrandsComponent {

  brandImages: Array<{src: string}> | undefined;

  constructor() {
    this.brandImages = [
      {src: '../../../../assets/images/brands/nike.avif'},
      {src: '../../../../assets/images/brands/carhartt.avif'},
      {src: '../../../../assets/images/brands/dr-marteens.avif'},
      {src: '../../../../assets/images/brands/ellese.avif'},
      {src: '../../../../assets/images/brands/north-face.avif'},
      {src: '../../../../assets/images/brands/tommy.webp'},
    ]
  }
}
