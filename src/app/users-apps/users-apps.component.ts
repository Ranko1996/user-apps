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
import { AddAppsPopupComponent } from '../components/add-app-user/add-apps-popup.component';
import { ApplicationsFirebaseService } from '../services/applications-firebase';


@Component({
  selector: 'app-users-apps',
  standalone: true,
  imports: [TableModule, HttpClientModule, ButtonModule, RippleModule, TagModule, DisplayAppsPopupComponent, AddAppsPopupComponent],
  providers: [AccountFirebaseService, ApplicationsFirebaseService],
  templateUrl: './users-apps.component.html',
  styleUrl: './users-apps.component.scss'
})
export class UsersAppsComponent {
  users!: AccountInterface[];
  selectedUserId: string | null = null;
  allApps: ApplicationInterface[] = [];
  selectedApps: ApplicationInterface[] = [];
  selectedId: string = "";

  displayAddPopup: boolean = false;
  displayPopup: boolean = false;

    constructor(private accountFirebaseService: AccountFirebaseService, private applicationsService: ApplicationsFirebaseService) {}

    ngOnInit() {
      this.applicationsService.getApplications().subscribe((apps) => {
        console.log(apps);
        this.allApps = apps;
      })
        this.accountFirebaseService.getUser().subscribe((accounts) => {
          this.users = accounts.map(user => ({
            ...user,
            dateOfBirth: new Date(user.dateOfBirth.seconds * 1000) // Convert Timestamp to Date
          }));
          console.log(this.users);
        });
    }

  

    onShowApplications(id: string) {
      this.selectedUserId = id;
      this.accountFirebaseService.getApps(id).subscribe((apps) => {
        this.selectedApps = apps;
        this.displayAddPopup = true;
      });
    }

    onAddApplication(id: string) {
      this.selectedId = id;
      this.displayPopup = true;
    }
    
}
