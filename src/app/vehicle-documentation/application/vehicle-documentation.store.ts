import { inject, Injectable, signal } from '@angular/core';
import { forkJoin, finalize, Observable } from 'rxjs';
import { VehicleDocumentationApi, VehicleReference } from '../infrastructure/vehicle-documentation-api';
import { DocumentType } from '../domain/model/document-type.entity';
import { VehicleDocument, VehicleDocumentInput, validateDocument } from '../domain/model/vehicle-document.entity';
@Injectable({ providedIn: 'root' })
export class VehicleDocumentationStore {
  private readonly api = inject(VehicleDocumentationApi);
  readonly documents = signal<VehicleDocument[]>([]);
  readonly types = signal<DocumentType[]>([]);
  readonly vehicles = signal<VehicleReference[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal(false);
  readonly vehicleId = signal('');
  private requestVersion = 0;
  load() {
    const version = ++this.requestVersion;
    this.loading.set(true); this.error.set(false);
    const selected = this.vehicleId();
    forkJoin({ types: this.api.getDocumentTypes(), vehicles: this.api.getVehicles(), documents: selected ? this.api.getDocumentsByVehicle(selected) : this.api.getExpiringDocuments() })
      .subscribe({ next: result => {
        if (version !== this.requestVersion) return;
        this.types.set(result.types); this.vehicles.set(result.vehicles); this.documents.set(result.documents); this.loading.set(false);
      }, error: () => { if (version === this.requestVersion) { this.error.set(true); this.documents.set([]); this.loading.set(false); } } });
  }
  selectVehicle(id: string) { this.vehicleId.set(id); this.load(); }
  save(input: VehicleDocumentInput, id: string | null, done: () => void) {
    if (this.saving() || !validateDocument(input)) return;
    this.saving.set(true); this.error.set(false);
    const request: Observable<VehicleDocument> = id ? this.api.updateDocument(id, input) : this.api.registerDocument(input);
    // Mutations are never retried automatically, avoiding duplicate registrations.
    request.pipe(finalize(() => this.saving.set(false))).subscribe({ next: () => { this.load(); done(); }, error: () => this.error.set(true) });
  }
}
