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

 


  // addProduct(text: string): Observable<string> {
  //   const productToCreate = {name: text, price: 12, image: "", description: ""}
  //   const promise = addDoc(this.productsCollection, productToCreate).then((response) => response.id);
  //   return from(promise);
  // }

  // addProduct(name: string, price: number, image: string, description: string): Observable<string> {
  //   const productToCreate = {name, price, image, description};
  //   const promise = addDoc(this.productsCollection, productToCreate).then((response) => response.id);
  //   return from(promise);
  // }

  // removeProduct(productId: string): Observable<void> {
  //   const docRef = doc(this.firestore, 'products/' + productId);
  //   const promise = deleteDoc(docRef);
  //   return from(promise);
  // }

  // editProduct(productId: string, name: string, price: number, image: string, description: string): Observable<void> {
  //   const docRef = doc(this.firestore, 'products/' + productId);
  //   const productToUpdate = {name, price, image, description};
  //   const promise = updateDoc(docRef, productToUpdate);
  //   return from(promise);
  // }
  
  // getProductById(productId: string): Observable<ProductInterface | undefined> {
  //   const docRef = doc(this.firestore, 'products/' + productId);
  //   const promise = getDoc(docRef).then(docSnapshot => {
  //     if (docSnapshot.exists()) {
  //       return { id: docSnapshot.id, ...docSnapshot.data() } as ProductInterface;
  //     } else {
  //       return undefined;
  //     }
  //   });
  //   return from(promise);
  // }

  // constructor() { }
}
