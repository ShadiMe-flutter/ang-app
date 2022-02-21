import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders() { 
    console.log("I'm in orders");


   
    
    
    return this.http.get('/api/orders');
      // .map(response => response.json());
  }
}
