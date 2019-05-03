// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as firebase from 'firebase/app'

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyDHc3oTXQ_tABzW9JXE7LTxPRhBeGo00tQ",
    authDomain: "examplerealtimedata.firebaseapp.com",
    databaseURL: "https://examplerealtimedata.firebaseio.com",
    projectId: "examplerealtimedata",
    storageBucket: "examplerealtimedata.appspot.com",
    messagingSenderId: "1002674730447"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
