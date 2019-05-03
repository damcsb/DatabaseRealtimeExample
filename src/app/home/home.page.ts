import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage 
  {
    
    // CONSTRUCTOR
    constructor(private auth: AuthService, private router: Router) { }
    //  
    // METHODS
    logout(){
      this.auth.doLogout().then((data)=>{
        console.log("Cerrando sesión");
        this.router.navigate(['/login'])
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
