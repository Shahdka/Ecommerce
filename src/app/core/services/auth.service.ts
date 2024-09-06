import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/enviroment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _HttpClient= inject(HttpClient)
  private readonly _Router=inject(Router)
  public decodedToken:any=null
  constructor() { }
  gitRegister(data:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  getLogin(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }


  DataToken():void{
   if(localStorage.getItem('token') !=null){
   this.decodedToken = jwtDecode(localStorage.getItem('token')!);
    console.log(this.decodedToken);
   }
  }


  logOut():void{
    localStorage.removeItem('token')
    this.decodedToken=null;
    this._Router.navigate(['/login'])
  }



  SetVerifyEmail(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }
  

  SetVerifyCode(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }

  SetNewPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
}
