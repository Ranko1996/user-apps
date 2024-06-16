import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog'

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ApplicationInterface } from '../../../types/application.interface';

@Component({
  selector: 'display-apps-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, ButtonModule],
  templateUrl: './display-apps-popup.component.html',
  styleUrls: ['./display-apps-popup.component.scss']
})
export class DisplayAppsPopupComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Input() applications: ApplicationInterface[] = [];

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
