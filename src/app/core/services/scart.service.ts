import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/enviroment';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SCartService {

  private readonly _HttpClient=inject(HttpClient)

  cartNum:BehaviorSubject<number>=new BehaviorSubject(0)
  public  tok:any={token:localStorage.getItem('token')}
  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{
      "productId":id
    },
      {
    headers:this.tok
      }
    )
  }


  getAllProductsInCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,)
  }


  DeleteSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,)
  }
  updateCount(id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count":count
      },
     
    )

  }



  DeleteAllProductsCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,)
  }
}
