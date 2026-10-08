import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { DocumentType } from '../domain/model/document-type.entity';
import { VehicleDocumentData, VehicleDocumentInput } from '../domain/model/vehicle-document.entity';
import { VEHICLE_DOCUMENTATION_CONFIG } from './vehicle-documentation.config';
import { VehicleDocumentAssembler } from './vehicle-document-assembler';
export interface VehicleReference { id: string; licensePlate: string; }
/** Fleet references are read-only: this context never modifies vehicles. */
@Injectable({ providedIn: 'root' })
export class VehicleDocumentationApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly config = inject(VEHICLE_DOCUMENTATION_CONFIG);
  private readonly assembler = new VehicleDocumentAssembler();
  getDocumentTypes() { return this.http.get<DocumentType[]>(`${this.config.baseUrl}/document-types`); }
  getVehicles() { return this.http.get<VehicleReference[]>(`${this.config.baseUrl}/vehicles`); }
  getDocumentsByVehicle(vehicleId: string) {
    return this.http.get<VehicleDocumentData[]>(`${this.config.baseUrl}/vehicles/${encodeURIComponent(vehicleId)}/documents`)
      .pipe(map(rows => rows.map(row => this.assembler.toEntityFromResource(row))));
  }
  getExpiringDocuments() {
    return this.http.get<VehicleDocumentData[]>(`${this.config.baseUrl}/documents/expiring`, { params: { days: this.config.alertDays } })
      .pipe(map(rows => rows.map(row => this.assembler.toEntityFromResource(row))));
  }
  registerDocument(input: VehicleDocumentInput) {
    return this.http.post<VehicleDocumentData>(`${this.config.baseUrl}/vehicles/${encodeURIComponent(input.vehicleId)}/documents`, input)
      .pipe(map(row => this.assembler.toEntityFromResource(row)));
  }
  updateDocument(id: string, input: VehicleDocumentInput) {
    return this.http.put<VehicleDocumentData>(`${this.config.baseUrl}/vehicles/${encodeURIComponent(input.vehicleId)}/documents/${encodeURIComponent(id)}`, input)
      .pipe(map(row => this.assembler.toEntityFromResource(row)));
  }
}
