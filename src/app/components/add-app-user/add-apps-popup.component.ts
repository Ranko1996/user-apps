import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog'
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ApplicationInterface } from '../../types/application.interface';
import { DropdownModule } from 'primeng/dropdown';
import { AccountFirebaseService } from '../../services/account-firebase.service';

@Component({
  selector: 'add-apps-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, ButtonModule, DropdownModule],
  providers: [AccountFirebaseService],
  templateUrl: './add-apps-popup.component.html',
  styleUrls: ['./add-apps-popup.component.scss']
})
export class AddAppsPopupComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;
  @Input() applications: ApplicationInterface[] = [];
  @Input() userId: string = '';
  selectedApp?: ApplicationInterface;

  constructor(private accountFirebaseService: AccountFirebaseService) {}
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  // assignAppsToUser() {
  //   this.accountFirebaseService.addApp(this.userId, this.selectedApp!).subscribe(() => {
  //     console.log(`Application added to user with ID: ${this.userId}`);
  //     // Dodajte dodatu aplikaciju u listu aplikacija izabranih korisnika
     
  //   }, (error: any) => {
  //     console.error('Error adding application to user:', error);
  //   });
  //   this.applications = [];
  //   this.onCancel(); // Zatvaranje popup-a nakon dodjeljivanja aplikacija
  // }
  assignAppsToUser() {
    this.accountFirebaseService.addApp(this.userId, this.selectedApp!)
      .then(() => {
        console.log(`Application added to user with ID: ${this.userId}`);
        // Dodajte dodatu aplikaciju u listu aplikacija izabranih korisnika
       
      })
      .catch((error: any) => {
        console.error('Error adding application to user:', error);
      });
    this.applications = [];
    this.onCancel(); // Zatvaranje popup-a nakon dodjeljivanja aplikacija
  }
  
}
