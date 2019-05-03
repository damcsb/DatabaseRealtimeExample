import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService 
  {
    //
    // CONSTRUCTOR
    constructor(public afAuth: AngularFireAuth) { }
    //
    // METHODS
    /** Registra un usuario en firebase */
    doRegister(email: string, password: string){
        return new Promise<any>((resolve, reject) => {
          this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
              res => resolve(res),
              err => reject(err))
            });
      }
    /** Inicia sesion en firebase con email y password */
    doLogin(email: string, password: string){
        return new Promise<any>((resolve, reject) => {
          this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
              res => resolve(res),
              err => reject(err))
            });
      }
    /** Cierra una sesión de usuario en firebase */
    doLogout(){
        if (this.afAuth.auth.currentUser)
            return this.afAuth.auth.signOut();
        return Promise.resolve();
      }
  }
