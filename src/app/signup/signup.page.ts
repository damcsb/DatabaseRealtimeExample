import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthFormData } from '../../extra/AuthFormData';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  public formData: AuthFormData = new AuthFormData;

  constructor(private auth: AuthService, private router: Router) { }

  signup(){
    this.auth.doRegister(this.formData.email, this.formData.password).then((data)=>{
      this.router.navigate(['/home'])
      console.log(data);
    })  
  }
  goToLogin(){
    this.router.navigate(['/login'])
  }
}
