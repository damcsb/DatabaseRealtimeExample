import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private auth: AuthService) { }
  
  public value  : { email:string, password:string } = {email:'', password:''}

  login(){
    this.auth.doLogin(this.value)
    .then((data) => {
      console.log(data);
    })
    .catch((err:Error)=> {
      console.log(err)
    })
  }
}
