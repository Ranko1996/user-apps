import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog'

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ApplicationInterface } from '../../types/application.interface';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss']
})
export class EditPopupComponent {
  @Input() display: boolean = false;

  @Output() displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<ApplicationInterface>();

  @Input() header!: string;

  @Input() application: ApplicationInterface = {
    id: '',
    name: '',
    url: '',
    version: '',
  };

  onConfirm() {
    this.confirm.emit(this.application);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
