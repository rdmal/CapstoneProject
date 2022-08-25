import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API= 'http://localhost:4200/api/auth/';

const httpOptions={ headers: new HttpHeaders ({"No-Auth":"True"}
  )
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(username: string, password:string):Observable<any>{
    
    return this.http.post(AUTH_API+ 'signin',{username,password},httpOptions);
  
  }

  register(username:string, email:string, password :string, firstname:string, lastname:string):Observable<any>{

    return this.http.post(AUTH_API + 'signup',{username,email, password, firstname,lastname } , httpOptions);
  
  }

  logout():Observable<any>{
    
    return this.http.post(AUTH_API + 'signout',{}, httpOptions);

  }

}
