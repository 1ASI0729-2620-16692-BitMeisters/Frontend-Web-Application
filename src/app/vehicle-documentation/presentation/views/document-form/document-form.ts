import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { VehicleDocumentationStore } from '../../../application/vehicle-documentation.store';
import { VehicleDocument, VehicleDocumentInput, validateDocument } from '../../../domain/model/vehicle-document.entity';
@Component({ selector: 'app-document-form', imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, TranslatePipe], templateUrl: './document-form.html', styleUrl: './document-form.css' })
export class DocumentForm {
  readonly store = inject(VehicleDocumentationStore);
  readonly document = input<VehicleDocument | null>(null);
  readonly closed = output<boolean>();
  readonly form = new FormGroup({
    vehicleId: new FormControl('', { nonNullable: true, validators: Validators.required }),
    documentTypeId: new FormControl('', { nonNullable: true, validators: Validators.required }),
    number: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(80)] }),
    issueDate: new FormControl('', { nonNullable: true, validators: Validators.required }),
    expirationDate: new FormControl('', { nonNullable: true, validators: Validators.required }),
    fileUrl: new FormControl('', { nonNullable: true, validators: Validators.pattern(/^https?:\/\/\S+$/i) }),
  }, { validators: control => validateDocument(control.value as VehicleDocumentInput) ? null : { documentInvalid: true } });
  ngOnInit() {
    const doc = this.document();
    if (doc) this.form.patchValue({ vehicleId: doc.vehicleId, documentTypeId: doc.documentTypeId, number: doc.number, issueDate: doc.issueDate, expirationDate: doc.expirationDate, fileUrl: doc.fileUrl });
    else this.form.controls.vehicleId.setValue(this.store.vehicleId());
  }
  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const input = this.form.getRawValue(); input.number = input.number.trim(); input.fileUrl = input.fileUrl.trim();
    this.store.save(input, this.document()?.id ?? null, () => this.closed.emit(true));
  }
}
