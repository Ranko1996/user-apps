import { ApplicationConfig } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: "AIzaSyAXZkriKFC7JGfgID-PNrWUhxi8aAjeyYo",
  authDomain: "angular-apps-8cadd.firebaseapp.com",
  projectId: "angular-apps-8cadd",
  storageBucket: "angular-apps-8cadd.appspot.com",
  messagingSenderId: "320186731654",
  appId: "1:320186731654:web:32ef39397fad03495b5507"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAnimations(), 
  ]
};
