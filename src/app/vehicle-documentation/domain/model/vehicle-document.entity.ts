import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { DocumentStatus } from './document-status.enum';

export const DOCUMENT_ALERT_DAYS = 30;

export interface VehicleDocumentInput {
  vehicleId: string;
  documentTypeId: string;
  number: string;
  issueDate: string;
  expirationDate: string;
  fileUrl: string;
}

export function localDate(today = new Date()): string {
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export function validDate(value: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}

export function validateDocument(input: VehicleDocumentInput): boolean {
  return (
    !!input.vehicleId.trim() &&
    !!input.documentTypeId.trim() &&
    !!input.number.trim() &&
    validDate(input.issueDate) &&
    validDate(input.expirationDate) &&
    input.issueDate <= input.expirationDate &&
    (!input.fileUrl || /^https?:\/\//i.test(input.fileUrl))
  );
}

export class VehicleDocument implements BaseEntity {
  #id: string;
  #vehicleId: string;
  #documentTypeId: string;
  #number: string;
  #issueDate: string;
  #expirationDate: string;
  #fileUrl: string;
  #createdAt: string;
  #updatedAt: string;

  constructor(props: {
    id: string;
    vehicleId: string;
    documentTypeId: string;
    number: string;
    issueDate: string;
    expirationDate: string;
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
  }) {
    this.#id = props.id;
    this.#vehicleId = props.vehicleId;
    this.#documentTypeId = props.documentTypeId;
    this.#number = props.number;
    this.#issueDate = props.issueDate;
    this.#expirationDate = props.expirationDate;
    this.#fileUrl = props.fileUrl;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get vehicleId(): string {
    return this.#vehicleId;
  }

  set vehicleId(value: string) {
    this.#vehicleId = value;
  }

  get documentTypeId(): string {
    return this.#documentTypeId;
  }

  set documentTypeId(value: string) {
    this.#documentTypeId = value;
  }

  get number(): string {
    return this.#number;
  }

  set number(value: string) {
    this.#number = value;
  }

  get issueDate(): string {
    return this.#issueDate;
  }

  set issueDate(value: string) {
    this.#issueDate = value;
  }

  get expirationDate(): string {
    return this.#expirationDate;
  }

  set expirationDate(value: string) {
    this.#expirationDate = value;
  }

  get fileUrl(): string {
    return this.#fileUrl;
  }

  set fileUrl(value: string) {
    this.#fileUrl = value;
  }

  get createdAt(): string {
    return this.#createdAt;
  }

  set createdAt(value: string) {
    this.#createdAt = value;
  }

  get updatedAt(): string {
    return this.#updatedAt;
  }

  set updatedAt(value: string) {
    this.#updatedAt = value;
  }

  daysUntilExpiration(today = localDate()): number {
    return Math.round((Date.parse(this.#expirationDate) - Date.parse(today)) / 86400000);
  }

  recalculateStatus(today = localDate(), alertDays = DOCUMENT_ALERT_DAYS): DocumentStatus {
    const days = this.daysUntilExpiration(today);
    if (!Number.isFinite(days)) throw new Error('Invalid expiration date');
    if (days < 0) return DocumentStatus.EXPIRED;
    return days <= alertDays ? DocumentStatus.EXPIRING : DocumentStatus.VALID;
  }

  isExpired(today = localDate()): boolean {
    return this.recalculateStatus(today) === DocumentStatus.EXPIRED;
  }
}
