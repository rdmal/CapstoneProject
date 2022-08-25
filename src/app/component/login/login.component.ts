import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

form:any={
  username:null,
  password:null
};
isLoggedIn=false;
isLoginFailed=false;
errorMessage='';
roles:string[]=[];
currentUser:any


  constructor(private authService:AuthService, private storageService:StorageService, private router:Router,private route: ActivatedRoute) { }


  ngOnInit(): void {

    if(this.storageService.isLoggedin()){
      this.isLoggedIn=true;
      this.roles=this.storageService.getUser().roles;
      this.currentUser=this.storageService.getUser();
      this.profilePage();
    }

  }

refreshPage(){
  window.location.reload();
}

onSubmit(){
  const {username, password}= this.form;

  this.authService.login(username,password).subscribe({
    next:data =>{
      this.storageService.saveUser(data);
      this.isLoginFailed=false;
      this.refreshPage();

    },
    error:err =>{
      this.errorMessage=err.error.message;
      this.isLoginFailed=true;
    }
  })
    
}
profilePage(){
  this.router.navigate(['create',this.currentUser.id])
}


}
