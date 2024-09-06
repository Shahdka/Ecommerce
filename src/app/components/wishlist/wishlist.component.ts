import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { Iwish } from '../../core/interface/iwish';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SCartService } from '../../core/services/scart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {
private readonly _WishlistService=inject(WishlistService)
private readonly _ToastrService=inject(ToastrService)
private readonly _SCartService=inject(SCartService)


WishData:Iwish[]=[]
responData:Iwish[]=[]


btn:boolean=false

endWishSub !:Subscription
  ngOnInit(): void {
    this.endWishSub= this._WishlistService.GetWishList().subscribe({
      next:(res)=>{
        console.log(res);
       
        this.WishData=res.data
        if(this.WishData.length==0){
          this.btn=false
        }else{
          this.btn=true
        }
      }
    })
 
    
  }


  AddThisProductToCart(id:string){


    
    
    this._SCartService.addProductToCart(id).subscribe({
      next:(res)=> {
       
        this._ToastrService.success(res.message,'Fresh Cart')
       
      },
 
    })
  }
  DeleteItem(id:string):void{
    this._WishlistService.deleteItem(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,"Fresh Wishlist")
        console.log(res);
        
        console.log(this.WishData);
        this.responData = this.WishData.filter((item: Iwish) => item.id !== id)
        this.WishData=this.responData
        if(this.WishData.length==0){
          this.btn=false
        }
        
      },
     
    })
  }
ngOnDestroy(): void {
  this.endWishSub?.unsubscribe()
}
}
