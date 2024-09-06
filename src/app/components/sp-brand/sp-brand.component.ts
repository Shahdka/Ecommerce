import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Isbrand } from '../../core/interface/isbrand';

@Component({
  selector: 'app-sp-brand',
  standalone: true,
  imports: [],
  templateUrl: './sp-brand.component.html',
  styleUrl: './sp-brand.component.scss'
})
export class SpBrandComponent  implements OnInit,OnDestroy{
private readonly _BrandsService=inject(BrandsService)
private readonly _ActivatedRoute=inject(ActivatedRoute)
enSub !:Subscription
bid :string|null=''
brand:Isbrand={} as Isbrand
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (p) => {
    this.bid= p.get('Bid');
    }
  })
  this.enSub= this._BrandsService.getBrandById(this.bid).subscribe({
    next: (res) => {
      console.log(res);
      this.brand=res.data;
    }
  })
}
ngOnDestroy(): void {
  this.enSub?.unsubscribe();
}
}
