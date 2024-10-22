import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service-api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _apiService:ApiService
  ) {}
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  login(){

    if(this.loginForm.value.email){
      if(this.loginForm.value.email == "admin" && this.loginForm.value.password == "123"){
        this._router.navigate(['dashboard'])
      }
      else{
        this._apiService.getAccountByEmail(this.loginForm.value.email).subscribe((res:any)=>{
          if(res[0] != null && this.loginForm.value.password == res[0].password){          
             this._router.navigate(['dashboard'])
          }  
         })
      }
     
    }

  }
}
