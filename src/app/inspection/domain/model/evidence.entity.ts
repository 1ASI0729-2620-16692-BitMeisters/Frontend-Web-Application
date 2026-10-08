import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type EvidenceMediaType = 'image/jpeg' | 'image/png';

export class Evidence implements BaseEntity {
  #id: string;
  #fileUrl: string;
  #mediaType: EvidenceMediaType;
  #uploadedAt: Date;

  constructor(props: {
    id: string;
    fileUrl: string;
    mediaType: EvidenceMediaType;
    uploadedAt: Date;
  }) {
    this.#id = props.id;
    this.#fileUrl = props.fileUrl;
    this.#mediaType = props.mediaType;
    this.#uploadedAt = props.uploadedAt;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get fileUrl(): string {
    return this.#fileUrl;
  }

  set fileUrl(value: string) {
    this.#fileUrl = value;
  }

  get mediaType(): EvidenceMediaType {
    return this.#mediaType;
  }

  set mediaType(value: EvidenceMediaType) {
    this.#mediaType = value;
  }

  get uploadedAt(): Date {
    return this.#uploadedAt;
  }

  set uploadedAt(value: Date) {
    this.#uploadedAt = value;
  }
}
