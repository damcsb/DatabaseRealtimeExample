import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthFormData } from './AuthFormData';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage 
  {
    // ATTS
    public formData: AuthFormData = new AuthFormData("aromero@contablio.com", "romerito");
    //
    // CONSTRUCTOR
    constructor(private auth: AuthService) { }
    //  
    // METHODS
    login(){
        return this.auth.doLogin(this.formData.email, this.formData.password)
          .then((data) => {
              console.log(data);
            })
          .catch((err:Error)=> {
              console.log(err)
            });
      }
  }
