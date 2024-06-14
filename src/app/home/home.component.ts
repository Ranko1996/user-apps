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
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, CommonModule, ToastModule, FormsModule, TagModule, InputTextModule, ButtonModule],
  providers: [MessageService], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  users!: AccountInterface[];

  accountFirebaseService = inject(AccountFirebaseService);
  messageService = inject(MessageService);
  

  ngOnInit() {
    this.accountFirebaseService.getApps("HnCDoLiMjVVGmxcEMR5V").subscribe((apps) => {
      // console.log("GETAPS");
      // console.log(apps);      
    })
    this.accountFirebaseService.getUser().subscribe((accounts) => {
      // console.log(accounts[0])
      this.users = accounts;
      console.log(this.users);
      // console.log(accounts[0].id);
    })
  }
  onRowEditInit(user: AccountInterface) {
    // this.messageService.add({severity: 'info', summary: 'Edit Initiated', detail: user.firstName});
    console.log("BLEEEE");
  }

  onRowEditSave(user: AccountInterface) {
    // this.accountFirebaseService.updateUser(user).then(() => {
    //   this.messageService.add({severity: 'success', summary: 'Success', detail: 'User is updated'});
    // }).catch(error => {
    //   this.messageService.add({severity: 'error', summary: 'Error', detail: 'User update failed'});
    // });
    // this.messageService.add({severity: 'success', summary: 'Success', detail: 'User is updated'});
    console.log("not finished");
  }

  onRowEditCancel(user: AccountInterface, index: number) {
    // this.messageService.add({severity: 'info', summary: 'Edit Cancelled', detail: user.firstName});
    console.log("Not finished");
  }

  getSeverity(status: boolean) {
    return status ? 'success' : 'danger';
  }

}
