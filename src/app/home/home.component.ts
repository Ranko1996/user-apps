import { Component, OnInit, inject } from '@angular/core';
import { AccountFirebaseService } from '../services/account-firebase.service';

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
    this.accountFirebaseService.getProducts().subscribe((accounts) => {
      console.log(accounts)
      // this.acc = products;
    })
  }
}
