import { BaseEntity } from '../../../../shared/domain/model/base-entity';

export type EvidenceMediaType = 'image/jpeg' | 'image/png';

export class Evidence implements BaseEntity {
  readonly id: string;
  readonly fileUrl: string;
  readonly mediaType: EvidenceMediaType;
  readonly uploadedAt: Date;

  constructor(props: {
    id: string;
    fileUrl: string;
    mediaType: EvidenceMediaType;
    uploadedAt: Date;
  }) {
    this.id = props.id;
    this.fileUrl = props.fileUrl;
    this.mediaType = props.mediaType;
    this.uploadedAt = props.uploadedAt;
  }
}
