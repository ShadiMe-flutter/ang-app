import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials:any) { 
    console.log("I'm in login");
    
   return this.http.post('/api/authenticate', JSON.stringify(credentials))
    .pipe(map((response:any) => {
      if(response && response.token){
        localStorage.setItem('token',response.token);
       return true;
      }
      return false;
      
    }));
      
  }

  logout() { 
    localStorage.removeItem('token');
  }

  isLoggedIn() { 
    
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if(!token){
      return false;
    }
    let expirationDate = jwtHelper.getTokenExpirationDate(token || undefined);
    let isExpired = jwtHelper.isTokenExpired(token || undefined);

    console.log("expiration date: "+expirationDate);
    console.log("isExpired: "+isExpired);
    return !isExpired;
  }


  get currentUser(){
    let token= localStorage.getItem('token');
    if(!token) return null;
    return new JwtHelperService().decodeToken(token);
  
  }
}
