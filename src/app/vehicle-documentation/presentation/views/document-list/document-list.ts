import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { VehicleDocumentationStore } from '../../../application/vehicle-documentation.store';
import { DOCUMENT_ALERT_DAYS, VehicleDocument, localDate } from '../../../domain/model/vehicle-document.entity';
import { DocumentForm } from '../document-form/document-form';
@Component({ selector: 'app-document-list', imports: [DatePipe, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, TranslatePipe, DocumentForm], templateUrl: './document-list.html', styleUrl: './document-list.css' })
export class DocumentList {
  readonly store = inject(VehicleDocumentationStore);
  readonly alertDays = DOCUMENT_ALERT_DAYS;
  readonly search = signal(''); readonly filter = signal('ALL');
  readonly showForm = signal(false); readonly editing = signal<VehicleDocument | null>(null);
  readonly notice = signal(false); readonly today = signal(localDate());
  private readonly timer = setInterval(() => this.today.set(localDate()), 60000);
  readonly filtered = computed(() => this.store.documents().filter(doc =>
    (this.filter() === 'ALL' || this.status(doc) === this.filter()) &&
    `${doc.number} ${this.typeName(doc.documentTypeId)} ${this.plate(doc.vehicleId)}`.toLowerCase().includes(this.search().toLowerCase())
  ).sort((a,b) => a.expirationDate.localeCompare(b.expirationDate)));
  ngOnInit() { this.store.load(); }
  ngOnDestroy() { clearInterval(this.timer); }
  status(doc: VehicleDocument) { return doc.recalculateStatus(this.today(), this.alertDays); }
  count(status: string) { return this.store.documents().filter(doc => this.status(doc) === status).length; }
  typeName(id: string) { return this.store.types().find(type => type.id === id)?.name ?? id; }
  plate(id: string) { return this.store.vehicles().find(vehicle => vehicle.id === id)?.plate ?? id; }
  open(doc: VehicleDocument | null = null) { this.editing.set(doc); this.showForm.set(true); this.notice.set(false); }
  close(saved: boolean) { this.showForm.set(false); this.editing.set(null); this.notice.set(saved); }
  safeUrl(url: string) { return /^https?:\/\//i.test(url) ? url : null; }
}
