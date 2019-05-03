import { Injectable } from "@angular/core";
//import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class FirebaseService 
  {
    snapshotChangesSubscription: any;

    constructor(private afs: AngularFirestore) { }
    //
    // METHODS
    createTask(value) {
      return new Promise<any>((resolve, reject) => {
        let currentUser = firebase.auth().currentUser;
        this.afs.collection('people').doc(currentUser.uid)
        .collection('task').add({
          title: value.title,
          description: value.description,
          image: value.image
        })
        .then(
          res => resolve(res),
          err => reject(err)
        )
      })
      }
    getTasks() {
      return new Promise<any>((resolve, reject) => {
        let currentUser = firebase.auth().currentUser;
        this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid)
        .collection('task').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
      });
        // 1. Obtiene una subscripción a la lista de tareas de un usuario
        // 2. Cualquier cambio en dicha lista (con las funciones create, update, delete)
        // nos aparecerá aquí automaticamente
        // 3. Cuando creamos una instancia (copia) del servicio, si el usuario hace logout
        // la suscripción sigue activa. Hay que asegurarse de que cuando un usuario hace
        // logout dejo de leer las tareas de este. Eso se hace con 'unsubscribeOnLogOut()'
      }

    updateTask(taskKey, value) {
        // Modifica una tarea con las clave 'taskKey' y le da el valor 'value'
        return new Promise<any>((resolve, reject) => {
          let currentUser = firebase.auth().currentUser;
          this.afs.collection('people').doc(currentUser.uid)
          .collection('task').doc(taskKey).set(value)
          .then(
            res => resolve(res),
            err => reject(err)
          )
        })
      }
    deleteTask(taskKey) {
        // Elimina una tarea con la clave 'taskKey'
        return new Promise<any>((resolve, reject) => {
          let currentUser = firebase.auth().currentUser;
          this.afs.collection('people').doc(currentUser.uid)
          .collection('task').doc(taskKey).delete()
          .then(
            res => resolve(res),
            err => reject(err)
          )
        })
      }
    
    encodeImageUri(imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
          var aux:any = this;
          c.width = aux.width;
          c.height = aux.height;
          ctx.drawImage(img, 0, 0);
          var dataURL = c.toDataURL("image/jpeg");
          callback(dataURL);
        };
        img.src = imageUri;
      };
    uploadImage(imageURI, randomId){
      return new Promise<any>((resolve, reject) => {
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child('image').child(randomId);
          this.encodeImageUri(imageURI, function(image64){
            imageRef.putString(image64, 'data_url')
            .then(snapshot => {
              snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
            }, err => {
              reject(err);
            })
          })
        })
      }
    unsubscribeOnLogOut() { }
  }