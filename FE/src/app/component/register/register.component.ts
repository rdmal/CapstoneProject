import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
form :any ={
  username:null, 
  email:null, 
  password:null, 
  firstname:null, 
  lastname:null,

};

isSuccessful= false;
isSignUpFailed=false;
errorMessage='';
 


  constructor(private authService: AuthService ) { }

  ngOnInit(): void {
  }

  refreshPage(){
      window.location.reload();
  }

  onSubmit():void {
    const {username, email, password, firstname, lastname}= this.form; 

    this.authService.register(username,email,password,firstname,lastname).subscribe({
      next:data =>{
        console.log(data);
        this.isSuccessful=true;
        this.isSignUpFailed=false;
      },
      error: err=>{
        this.errorMessage= err.error.message;
        this.isSignUpFailed=true;
      }
    })
  }




}
