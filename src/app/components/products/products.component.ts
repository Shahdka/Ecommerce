import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interface/iproduct';
import { RouterLink } from '@angular/router';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { SCartService } from '../../core/services/scart.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,TermTextPipe,SearchPipe,FormsModule,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit ,OnDestroy{
  private readonly _ProductService=inject(ProductService)
  private readonly _SCartService=inject(SCartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _WishlistService=inject(WishlistService) 
  wordSearch:string=""
  ToggleSearch:boolean=false
  productList:Iproduct[]=[]
  endSub !:Subscription
  sCart !:Subscription
ngOnInit(): void {
  this.endSub= this._ProductService.getAllProduct().subscribe({
    next:(res)=>{
      this.productList=res.data
    },
  })
}
toggleSearch():void{
  this.ToggleSearch=!this.ToggleSearch
}
AddThisProductToCart(id:string){
  this.sCart= this._SCartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log("Product added to cart",res)
      this._ToastrService.success(res.message,"Fresh Cart")
      this._SCartService.cartNum.next(res.numOfCartItems)
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
ngOnDestroy(): void {
  this.endSub?.unsubscribe();
  this.sCart?.unsubscribe()
}
}
