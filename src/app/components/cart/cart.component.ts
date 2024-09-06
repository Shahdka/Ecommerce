import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SCartService } from '../../core/services/scart.service';
import { IPcart } from '../../core/interface/ipcart';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnDestroy {
  private readonly _SCartService=inject(SCartService)
  private readonly _ToastrService=inject(ToastrService)
  DataCart:IPcart ={} as IPcart

  btn:boolean=false
  getAllEndSub !:Subscription
  deleteItemEndSub !:Subscription
  UpCountEndSub !:Subscription
  DeleteAll !:Subscription

  ngOnInit(): void {
  
    this.getAllEndSub=this._SCartService.getAllProductsInCart().subscribe({
      next:(res)=>{
      
        this._ToastrService.success(res.status,'Fresh Cart')
        this.DataCart=res.data

        if(res.data.products.length !=0){
          this.btn=true
        }
      },
    })
  }

  DeleteItem(id:string){
  this.deleteItemEndSub= this._SCartService.DeleteSpecificProduct(id).subscribe({
      next:(res)=>{
        console.log(res);
        
        this._ToastrService.success(res.status,'Fresh Cart')
        this._SCartService.cartNum.next(res.numOfCartItems)
        if(res.data.products.length ===0){
          this.btn=false
        }
      this.ngOnInit()
      },
    })
  }


  DeleteAllInCart(){
    this.DeleteAll= this._SCartService.DeleteAllProductsCart().subscribe({
    next:(res)=>{
      console.log(res);
      
      console.log('All items deleted from cart')
      this._ToastrService.success(res.message,'Fresh Cart')
      this.DataCart= {}as IPcart
      this.btn=false;
      this._SCartService.cartNum.next(0)
    },
      
    })
  }

  UpdateCountNUM(id:string, count:number){
    if(count>0){
      this.UpCountEndSub=this._SCartService.updateCount(id ,count).subscribe({
        next:(res)=>{
        
          this._ToastrService.success(res.status,'Fresh Cart')
          this.DataCart=res.data
        },
    
      })
    }else if(count ==0 ){
      alert('if you want to delete product click on  trash')
    }
  }


  ngOnDestroy(): void {
    this.getAllEndSub?.unsubscribe()
    this.deleteItemEndSub?.unsubscribe()
    this.UpCountEndSub?.unsubscribe()
    this.getAllEndSub?.unsubscribe()
  }

}
