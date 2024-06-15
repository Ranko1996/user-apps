import { Component, OnInit, inject } from '@angular/core';
import { AccountFirebaseService } from '../services/account-firebase.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AccountInterface } from '../types/account.interface';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ApplicationsFirebaseService } from '../services/applications-firebase';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, CommonModule, ToastModule, FormsModule, TagModule, InputTextModule, ButtonModule, DropdownModule, CalendarModule],
  providers: [MessageService], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  users!: AccountInterface[];
  status!: boolean;
  startDate: Date;
  endDate: Date;

  constructor() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    this.startDate = startOfMonth;
    this.endDate = today;
  }
  accountFirebaseService = inject(AccountFirebaseService);
  appsFirebaseService = inject(ApplicationsFirebaseService);
  messageService = inject(MessageService);
  

  ngOnInit() {
    this.appsFirebaseService.getApplications().subscribe((apps) => {
      console.log(apps);
    })
    this.accountFirebaseService.getApps("HnCDoLiMjVVGmxcEMR5V").subscribe((apps) => {
      // Handle apps
    });
    
    this.accountFirebaseService.getUser().subscribe((accounts) => {
      this.users = accounts.map(user => ({
        ...user,
        dateOfBirth: new Date(user.dateOfBirth.seconds * 1000) // Convert Timestamp to Date
      }));
      console.log(this.users);
    });
  }
  onRowEditInit(user: AccountInterface) {
    this.accountFirebaseService.editUser(user.id, user.firstName, user.lastName, user.email, user.active, user.dateOfBirth)
      .subscribe();
  }

  onRowEditSave(user: AccountInterface) {
    this.accountFirebaseService.editUser(user.id, user.firstName, user.lastName, user.email, user.active, user.dateOfBirth)
      .subscribe(() => {}, error => {}); // Ignore success and error responses
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'User is updated'});
  }

  onRowEditCancel(user: AccountInterface, index: number) {
    this.messageService.add({severity: 'info', summary: 'Edit Cancelled', detail: user.firstName});
    console.log("Not finished");
  }
  
  onRowDelete(user: AccountInterface, index: number) {
    this.accountFirebaseService.removeUser(user.id)
      .subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User is deleted'});
        this.users.splice(index, 1);
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'User deletion failed'});
      });
  }


  getSeverity(status: boolean) {
    return status ? 'success' : 'danger';
  }

}
