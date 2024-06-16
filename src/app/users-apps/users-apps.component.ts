import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { AccountFirebaseService } from '../services/account-firebase.service';
import { AccountInterface } from '../types/account.interface';
import { DisplayAppsPopupComponent } from '../components/display-apps-popup/edit-popup/display-apps-popup.component';
import { ApplicationInterface } from '../types/application.interface';


@Component({
  selector: 'app-users-apps',
  standalone: true,
  imports: [TableModule, HttpClientModule, ButtonModule, RippleModule, TagModule, DisplayAppsPopupComponent],
  providers: [AccountFirebaseService],
  templateUrl: './users-apps.component.html',
  styleUrl: './users-apps.component.scss'
})
export class UsersAppsComponent {
  users!: AccountInterface[];
  selectedUserId: string | null = null;
  selectedApps: ApplicationInterface[] = [];

  
  displayAddPopup: boolean = false;

    constructor(private accountFirebaseService: AccountFirebaseService) {}

    ngOnInit() {
        // this.customerService.getCustomersMedium().then((data) => {
        //     this.customers = data;
        // });
        this.accountFirebaseService.getUser().subscribe((accounts) => {
          this.users = accounts.map(user => ({
            ...user,
            dateOfBirth: new Date(user.dateOfBirth.seconds * 1000) // Convert Timestamp to Date
          }));
          console.log(this.users);
        });
    }

    toggleAddPopup() {
      this.displayAddPopup = true;
    }

    onShowApplications(id: string) {
      this.selectedUserId = id;
      this.accountFirebaseService.getApps(id).subscribe((apps) => {
        this.selectedApps = apps;
        this.displayAddPopup = true;
      });
    }

    onAddApplication() {
      
    }
    
}
