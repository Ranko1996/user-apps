import { Component, OnInit, inject } from '@angular/core';
import { AccountFirebaseService } from '../services/account-firebase.service';
import { ApplicationInterface } from '../types/application.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  accountFirebaseService = inject(AccountFirebaseService);

  ngOnInit() {
    this.accountFirebaseService.getApps("TnS68Gap3TTcXWkwmaSg").subscribe((apps) => {
      console.log(apps);      
    })
    this.accountFirebaseService.getProducts().subscribe((accounts) => {
      console.log(accounts)
      console.log(accounts[0].id);
    })
   
   
    // Radi ali zakomentirano da ne dodaje stalno 
      // const newApp: ApplicationInterface = {
      //   url: 'https://www.netflix.com/hr/',
      //   name: 'Facebook',
      //   version: '2.3',
      // };
  
      // this.accountFirebaseService.addApp("TnS68Gap3TTcXWkwmaSg", newApp).then(() => {
      //   console.log('New application added');
      // }).catch(error => {
      //   console.error('Error adding new application:', error);
      // });
    
  }


}
