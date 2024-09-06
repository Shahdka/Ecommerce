import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { IDetails } from '../../core/interface/idetails';
import { Observable, Subscription } from 'rxjs';
import { Iproduct } from '../../core/interface/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SCartService } from '../../core/services/scart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detils1',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './detils1.component.html',
  styleUrl: './detils1.component.scss'
})
export class Detils1Component implements OnInit  ,OnDestroy {
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _ProductService = inject(ProductService)
  private readonly _SCartService=inject(SCartService)
  private readonly _ToastrService=inject(ToastrService)
  ProductId:string|null=''
  detailsInfo:Iproduct|null=null
  productSub !:Subscription

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.ProductId=  p.get('productId')
        this.productSub= this._ProductService.getSpecificProduct(this.ProductId).subscribe({
          next:(res)=>{
            this.detailsInfo=res.data
          },
        })
      }
    })
    
  }

;
  

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay:true,
  autoplayHoverPause:true,
  autoplaySpeed:3000,
  pullDrag: false,
  dots: true,
  navSpeed: 400,
  navText: ['', ''],
 items:1,
  nav: false
}



AddProductToCart(id:string):void{

  this._SCartService.addProductToCart(id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message,'fresh Cart')
    },
  })

}



  ngOnDestroy(): void {
    this.productSub.unsubscribe()
  }

}
