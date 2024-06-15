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
import { ApplicationInterface } from '../types/application.interface';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [TableModule, CommonModule, EditPopupComponent, ToastModule, FormsModule, TagModule, InputTextModule, ButtonModule, DropdownModule, CalendarModule],
  providers: [MessageService], 
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {
  apps!: ApplicationInterface[];
  displayAddPopup: boolean = false;
  private applicationsService = inject(ApplicationsFirebaseService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.applicationsService.getApplications().subscribe((apps) => {
      console.log(apps);
      this.apps = apps;
    })
  
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }
  onConfirmAdd(application: ApplicationInterface) {
    this.addApp(application);
    this.displayAddPopup = false;
  }

  addApp(application: ApplicationInterface) {
    this.applicationsService.addApplication(application.name, application.version,application.url)
      .subscribe((id) => {
        console.log(`App added with ID: ${id}`);
        // Dodajte novi proizvod u lokalnu listu proizvoda
        this.apps.push({ ...application, id });
      }, error => {
        console.error('Error adding app:', error);
      });
  }


  onRowEditInit(app: ApplicationInterface) {
    this.applicationsService.editApplication(app.id!, app.name, app.url, app.version)
      .subscribe();
  }

  onRowDelete(app: ApplicationInterface, index: number) {
    const startIndex = index;
    const endIndex = index + 1;
    this.applicationsService.removeApplication(app.id!)
      .subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Application is deleted'});
        this.apps.splice(startIndex, endIndex - startIndex);
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Application deletion failed'});
      });
  }



  onRowEditSave(app: ApplicationInterface) {
    this.applicationsService.editApplication(app.id!, app.name, app.url, app.version)
      .subscribe(() => {}, error => {}); // Ignore success and error responses
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Application is updated'});
  }
  onRowEditCancel(user: AccountInterface, index: number) {
    this.messageService.add({severity: 'info', summary: 'Edit Cancelled', detail: user.firstName});
    console.log("Not finished");
  }

}
