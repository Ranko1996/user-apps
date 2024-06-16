import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { ApplicationInterface } from '../types/application.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsFirebaseService {
  firestore = inject(Firestore)
  applicationsCollection = collection(this.firestore, 'applications')

  getApplications(): Observable<ApplicationInterface[]> {
    return collectionData(this.applicationsCollection, {
        idField: 'id',
    }) as Observable<ApplicationInterface[]>;
  }



  addApplication(name: string,  version: string, url: string,): Observable<string> {
    const applicationToCreate = {name, version, url};
    console.log(applicationToCreate);
    const promise = addDoc(this.applicationsCollection, applicationToCreate).then((response) => response.id);
    return from(promise);
  }

  removeApplication(productId: string): Observable<void> {
    const docRef = doc(this.firestore, 'applications/' + productId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  editApplication(appId: string, name: string, url: string, version: string, ): Observable<void> {
    const docRef = doc(this.firestore, 'applications/' + appId);
    const appToUpdate = {name, version, url};
    const promise = updateDoc(docRef, appToUpdate);
    return from(promise);
  }
  
//   getProductById(productId: string): Observable<ApplicationInterface | undefined> {
//     const docRef = doc(this.firestore, 'products/' + productId);
//     const promise = getDoc(docRef).then(docSnapshot => {
//       if (docSnapshot.exists()) {
//         return { id: docSnapshot.id, ...docSnapshot.data() } as ApplicationInterface;
//       } else {
//         return undefined;
//       }
//     });
//     return from(promise);
//   }

  // constructor() { }
}
