import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { AccountInterface } from '../types/account.interface';
import { ApplicationInterface } from '../types/application.interface';
// import { ProductInterface } from '../types/product.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountFirebaseService {
  firestore = inject(Firestore)
  productsCollection = collection(this.firestore, 'account')

  getUser(): Observable<AccountInterface[]> {
    return collectionData(this.productsCollection, {
        idField: 'id',
    }) as Observable<AccountInterface[]>;
  }
  editUser(accountId: string, firstName: string, lastName: string, email: string, active: boolean, dateOfBirth: Date): Observable<void> {
    const docRef = doc(this.firestore, 'account/' + accountId);
    const userToUpdate = {firstName, lastName, email, active, dateOfBirth};
    const promise = updateDoc(docRef, userToUpdate);
    return from(promise);
  }
  addUser( firstName: string, lastName: string, email: string, active: boolean, dateOfBirth: Date): Observable<string> {
    const userToCreate = {firstName, lastName, email, active, dateOfBirth};
    console.log(userToCreate);
    const promise = addDoc(this.productsCollection, userToCreate).then((response) => response.id);
    return from(promise);
  }
  
  removeUser(accountId: string): Observable<void> {
    const docRef = doc(this.firestore, 'account/' + accountId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  getApps(accountId: string): Observable<ApplicationInterface[]> {
    console.log(`Fetching applications for account ID: ${accountId}`);
    const appsCollection = collection(this.firestore, `account/${accountId}/applications`);
    return collectionData(appsCollection, {
      idField: 'id',
    }) as Observable<ApplicationInterface[]>;
  }

  addApp(accountId: string, app: ApplicationInterface): Promise<void> {
    const appsCollection = collection(this.firestore, `account/${accountId}/applications`);
    return addDoc(appsCollection, app).then(() => {
      console.log(`Application added to account ID: ${accountId}`);
    }).catch(error => {
      console.error('Error adding application:', error);
    });
  }

  removeApp(accountId: string, appId: string): Observable<void> {
    const appsCollection = collection(this.firestore, `account/${accountId}/applications`);
    const docRef = doc(appsCollection, appId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

}
