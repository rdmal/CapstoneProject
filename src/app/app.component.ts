import { Component } from '@angular/core';
import { User } from './classes/user';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FE';

  private roles:string[]=[]
  isLoggedIn=false;
  showAdminBoard=false;
  showModeratorBoard=false;
  username?:string;
currentid:any

  user:User=new User();


  constructor( private storageService:StorageService, private authService: AuthService){}



  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedin();

    if (this.isLoggedIn) {
       this.user = this.storageService.getUser();
      
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = this.user.username;
      this.currentid=this.user.id;
    }
    



}

logout():void{
  this.authService.logout().subscribe({
    next:res=> {
      console.log(res);
      this.storageService.clean();
    },
    error:err=>{ 
      console.log(err)
    }
  });
  this.redirect();
}

redirect(){
  window.location.href=`/home`

}


}
