import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

interface Itask {
    key: string,
    description: string
}

@Injectable()
export class TasksService 
  {
    // ATTS
    public tasks: Itask[] = [];
    public tasksObs: Observable<any[]>;
    public uid: string;
    public ref: AngularFireList<{}>;
    //
    // CONSTRUCTOR
    constructor(private db: AngularFireDatabase) { }
    //
    // METHODS
    subscribe(uid: string) {
        this.uid = uid;
        this.ref = this.db.list(`usuarios/${ this.uid }/tasks`);
        this.tasksObs = this.ref.snapshotChanges();
        this.tasksObs.subscribe(actions => {
            console.log({ actions })
            this.tasks = []; 
            actions.forEach(action => {
                let payload: any = action.payload.val();
                let newTask: Itask;
                newTask = {
                    key: action.key,
                    description: payload.description
                  };
                this.tasks.push(newTask);
              });
          });
      }
    create(description: string) {
        if (!this.uid) return;
        this.ref.push({ description });
      }
    delete(key: string) {
        this.ref.remove(key);
      }
  }