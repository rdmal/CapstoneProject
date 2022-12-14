import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';


const API_URL = 'http://localhost:4200/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

    getPublicContent(): Observable<any>{
      return this.http.get(API_URL+'all',{responseType:'text'});
    }

    getUserBoard():Observable<any>{

      return this.http.get(API_URL+'mod',{responseType:'text'});
    }

    getModeratorBoard():Observable<any>{

      return this.http.get(API_URL+'mod',{responseType:'text'});

    }

    getAdminBoard():Observable<any>{
      return this.http.get(API_URL+'admin',{responseType:'text'});
    }

    getUsers():Observable<User[]>{
      return this.http.get<User[]>(`${API_URL}users`)
    }

  
}
