import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { AccountInterface } from '../types/product.interface';
// import { ProductInterface } from '../types/product.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountFirebaseService {
  firestore = inject(Firestore)
  productsCollection = collection(this.firestore, 'account')

  getProducts(): Observable<AccountInterface[]> {
    return collectionData(this.productsCollection, {
        idField: 'id',
    }) as Observable<AccountInterface[]>;
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
