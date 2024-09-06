import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Iproduct } from '../../core/interface/iproduct';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../core/services/category.service';
import { ICategry } from '../../core/interface/icategry';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SCartService } from '../../core/services/scart.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,TermTextPipe,CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{
  private readonly _ProductService= inject(ProductService)
  private readonly _CategoryService=inject(CategoryService)
  private readonly _SCartService=inject(SCartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _WishlistService=inject(WishlistService)
  productList:Iproduct[]=[];
  categoryList:ICategry[]=[]
  productID:any=[]
    productsSub !:Subscription
    CategorySub !:Subscription

    isRed:boolean=false


    customOptionsMain: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      dots: true,
      navSpeed: 300,
      navText: ['', ''],
      items:1,
      nav: false
    }


    customOptionsCategories: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      dots: true,
      navSpeed: 300,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 6
        }
      },
      nav: false
    }
  
  
    AddThisProductToCart(id:string){
      this.productID.push(id)

      console.log(this.productID);
      
      this._SCartService.addProductToCart(id).subscribe({
        next:(res)=> {
          this._ToastrService.success(res.message,'Fresh Cart')
          this._SCartService.cartNum.next(res.numOfCartItems)
            this.isRed=true
        },
      })
    }
    AddProductToWish(id:string):void{
      this._WishlistService.AddToWish(id).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message,'Fresh Wishlist')

        },
      })
    }

  ngOnInit(): void {
  this.productsSub= this._ProductService.getAllProduct().subscribe({
      next:(res)=>{
        console.log(res);
        
        this.productList=res.data
        
      },
      error:(err)=>{
      }
    }),
    this.CategorySub= this._CategoryService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoryList=res.data
      },
    })

  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe()
    this.CategorySub?.unsubscribe()
  }
}
