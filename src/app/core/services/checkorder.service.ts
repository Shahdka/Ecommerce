import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CheckorderService {
 tok :any={token: localStorage.getItem('token')} 
  constructor(private  _HttpClient: HttpClient) { }
  

  checkOutOrder(id:string|null, Shipping:object ):Observable<any>{
   return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.urlServer}`,
    {
       "shippingAddress": Shipping
    },
    {
      headers:this.tok
    }

   ) 
  }

}
