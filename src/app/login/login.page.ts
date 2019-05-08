import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthFormData } from '../../extra/AuthFormData';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public formData: AuthFormData = new AuthFormData("aromero@contablio.com", "romerito");
    //
    // CONSTRUCTOR
    constructor(private auth: AuthService, private router: Router) { }
    //  
    // METHODS
    login(){
        return this.auth.doLogin(this.formData.email, this.formData.password)
          .then((data) => {
              console.log(data);
              this.router.navigate(['/home'])
            })
          .catch((err:Error)=> {
              console.log(err)
            });
      }
    
    goToSignup(){
        this.router.navigate(['/signup'])
      }
  }
