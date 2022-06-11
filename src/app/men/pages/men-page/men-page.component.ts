import { Component } from '@angular/core';


@Component({
  selector: 'men-page',
  templateUrl: './men-page.component.html',
  styleUrls: ['./men-page.component.scss']
})
export class MenPageComponent {

  categoryList = [
    {
      name: 'ASOS DESIGN JEWELS',
      caption: 'E-boy energy',
      src: './../../../../assets/images/category/jewels_category.avif',
    },
    {
      name: 'SHOES',
      caption: 'Sneaky peaks',
      src: '../../../../assets/images/category/shoes_category.avif',
    },
    {
      name: 'SKATE PRINTS',
      caption: 'Punk Perfection by ASOS Design',
      src: '../../../../assets/images/category/skate_prints.avif',
    },
    {
      name: 'HIIT',
      caption: 'Ready, sweat, go!',
      src: '../../../../assets/images/category/hit_category.avif',
    },
  ]

  brandList = [
    {
      brandName: 'TOPMAN',
      caption: 'Top-tier threads',
      src: '../../../../assets/images/category/topman_brand.avif',
    }
  ]

  asosList = [
    {
      title: 'THE ASOS CIRCULAR DESIGN COLLECTION',
      src: '../../../../assets/images/category/asos_design.avif',
    }
  ]

}
