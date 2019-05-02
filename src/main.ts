import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as firebase from 'firebase/app'


if (environment.production) {
  enableProdMode();
}

var config = {
  apiKey: "AIzaSyDHc3oTXQ_tABzW9JXE7LTxPRhBeGo00tQ",
  authDomain: "examplerealtimedata.firebaseapp.com",
  databaseURL: "https://examplerealtimedata.firebaseio.com",
  projectId: "examplerealtimedata",
  storageBucket: "examplerealtimedata.appspot.com",
  messagingSenderId: "1002674730447"
};
firebase.initializeApp(config);



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
