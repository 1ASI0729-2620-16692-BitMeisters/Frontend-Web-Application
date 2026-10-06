import { DocumentStatus } from './document-status.enum';
export interface VehicleDocumentData {
  id: string;
  vehicleId: string;
  documentTypeId: string;
  number: string;
  issueDate: string;
  expirationDate: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}
export type VehicleDocumentInput = Omit<VehicleDocumentData, 'id' | 'createdAt' | 'updatedAt'>;
export function localDate(today = new Date()): string {
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}
export function validDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
/** Date-only arithmetic avoids timezone and daylight-saving boundary errors. */
export class VehicleDocument implements VehicleDocumentData {
  id = ''; vehicleId = ''; documentTypeId = ''; number = ''; issueDate = '';
  expirationDate = ''; fileUrl = ''; createdAt = ''; updatedAt = '';
  constructor(data: VehicleDocumentData) { Object.assign(this, data); }
  daysUntilExpiration(today = localDate()): number {
    return Math.round((Date.parse(this.expirationDate) - Date.parse(today)) / 86400000);
  }
  recalculateStatus(today = localDate(), alertDays = 30): DocumentStatus {
    const days = this.daysUntilExpiration(today);
    if (!Number.isFinite(days)) throw new Error('Invalid expiration date');
    return days < 0 ? DocumentStatus.EXPIRED : days <= alertDays ? DocumentStatus.EXPIRING : DocumentStatus.VALID;
  }
  isExpired(today = localDate()): boolean { return this.recalculateStatus(today) === DocumentStatus.EXPIRED; }
}
export function validateDocument(input: VehicleDocumentInput): boolean {
  return !!input.vehicleId.trim() && !!input.documentTypeId.trim() && !!input.number.trim()
    && validDate(input.issueDate) && validDate(input.expirationDate)
    && input.issueDate <= input.expirationDate
    && (!input.fileUrl || /^https?:\/\//i.test(input.fileUrl));
}
