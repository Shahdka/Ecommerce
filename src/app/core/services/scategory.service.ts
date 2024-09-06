import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SCategoryService {

  constructor(private _HttpClient:HttpClient) { }


  getAllCategory():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getSubCategory(id: string|null): Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }
}
