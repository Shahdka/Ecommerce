import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { Ibrand } from '../../core/interface/ibrand';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit ,OnDestroy {
private readonly _BrandsService=  inject(BrandsService)
private readonly _ToastrService=  inject(ToastrService)
endSub !:Subscription
brands: Ibrand[]=[]

ngOnInit() {
  this._BrandsService.getBrands().subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success('our brands','Fresh Cart')
      this.brands=res.data
    }
  })
  
}
ngOnDestroy(): void {
  this.endSub?.unsubscribe();
}
}
