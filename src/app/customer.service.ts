import { Customer } from './customer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable, BehaviorSubject } from 'rxjs';  
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BehaviorSubject<GridDataResult> {
  url = 'https://localhost:44313/api/Customer';

  constructor(private http:HttpClient) {
         super(null);
   }

  getAllCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);  
  }
  getCustomer(Id:number):Observable<Customer>{
    return this.http.get<Customer>(this.url +'/'+ Id);
  }
  CreateCustomer(cust : Customer):Observable<Customer>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.http.post<Customer>(this.url,cust,httpOptions);
  }
  UpdateCustomer(cust : Customer):Observable<Customer>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.http.put<Customer>(this.url+'/'+ cust.id,cust,httpOptions);
  }
  DeleteCustomer(Id:number):Observable<number>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url+ '?id=' +Id, httpOptions);
  }
  
  // for grid filter


}
