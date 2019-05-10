import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ TasksService ]
})
export class HomePage
  {
  description: string;

    //
    //PROPERTYS

    // CONSTRUCTOR
    constructor(private authService: AuthService, private router: Router, public tasksService: TasksService, public alertController: AlertController) { 
    }
    //
    // IMPLEMENTS
    /** Este hook o evento de componente de Ionic me permite meter código que se
     *  ejecutará cada vez que la página se vaya a visualizar. Ojo, que se vaya a 
     *  visualizar no es lo mismo que esté visualizada. Se dispara justo antes de mostrarla
     *  al usuario. El evento ionViewDidEnter se llama cuando ya se muestra.
     *  La idea es que si el usuario no está logueado, lo llevamos a LOGIN antes de
     *  enseñarle nada
     */
    ionViewWillEnter() {
        if (this.authService.afAuth.auth.currentUser == undefined) {
            this.router.navigate(['/login'])
        } else {
            let uid: string = this.authService.afAuth.auth.currentUser.uid;
            this.tasksService.subscribe(uid);
        }
        console.log(this.tasksService.tasks);
        }
    //  
    // METHODS
    logout(){
        this.authService.doLogout().then((data)=>{
          this.router.navigate(['/login'])
        })
        .catch((error) => {
          console.log(error)
        })
      }
    //
    // Modal (create new task)
    async InputAlert() {
        const alert = await this.alertController.create({
            header: 'Agregar Tarea',
            message: 'Descripción',
            inputs: [ { name: 'description' } ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => this.noAddTaskHandler()
              }, {
                text: 'Ok',
                handler: (data) => this.addTaskHandler(data.description)
              }
            ]
          });
        await alert.present();
      }
    private addTaskHandler(description: string) {
        if (description == "")
            return false;
        this.tasksService.create(description);
      }
    private noAddTaskHandler() { }

    async AlertaBorrar() {
      const alert = await this.alertController.create({
        header: '¿Eliminar',
        message: '¿Deseas borrar esa tarea?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (err) => {
              console.log("error");
            }
          }, {
            text: 'Okay',
            handler: (data: string) => {
              console.log('Confirm Okay');
              this.tasksService.ref.remove(data); 
            }
          }
        ]
      });
  
      await alert.present();
    }

    deleteItem(key: string) {    
      this.tasksService.ref.remove(key); 
    }
  }
