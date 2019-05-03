import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service'

@Injectable()
export class AuthService {
  constructor(
    private firebaseService: FirebaseService,
  ){}
  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
  }
  doLogin(value){
    // Una vez que el usuario inicia sesión, tengo que suscribirme a su listado de tareas

    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
  }
  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          // Dejo de leer las tareas para este usuario (que acaba de cerrar sesión)
          this.firebaseService.unsubscribeOnLogOut();
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
}
