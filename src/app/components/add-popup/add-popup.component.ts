import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-app-popup',
  templateUrl: './add-popup.component.html',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,

  styleUrls: ['./add-popup.component.scss']
})

export class AddPopupComponent {
  addAppForm: FormGroup;
  
  @Output() appAdded = new EventEmitter<{url: string, name: string, version: string}>();
  @Output() closePopup = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.addAppForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      name: ['', Validators.required],
      version: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addAppForm.valid) {
      this.appAdded.emit(this.addAppForm.value);
      this.onClose();
    }
  }

  onClose() {
    this.closePopup.emit();
  }
}
