import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ApplicationInterface } from '../../types/application.interface';
import { AccountInterface } from '../../types/account.interface';


@Component({
  selector: 'add-user-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, ButtonModule, CalendarModule],
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss']
})
export class AddUserPopupComponent {
  @Input() display: boolean = false;

  @Output() displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<AccountInterface>();

  @Input() header!: string;

  @Input() user: AccountInterface = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    active: false,
    dateOfBirth: new Date(),
  };

  onConfirm() {
    this.confirm.emit(this.user);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
