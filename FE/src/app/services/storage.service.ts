import { Injectable } from '@angular/core';
import { User } from '../classes/user';

const USER_KEY='auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor() { }

    clean():void{
      window.sessionStorage.clear();

    }

    public saveUser(user:any):void{
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));

    }

    public getUserRoles():any{

      const user = window.sessionStorage.getItem(USER_KEY);

    }

    public getUser():any{
      const user = window.sessionStorage.getItem(USER_KEY);
      if(user){
        return JSON.parse(user);
      }

      return {};
    }

    public isLoggedin():boolean{
      const user = window.sessionStorage.getItem(USER_KEY);
      if(user){
        return true;
      }
      return false;
    }

}
