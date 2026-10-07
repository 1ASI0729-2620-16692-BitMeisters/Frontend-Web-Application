import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class Evidence extends BaseEntity {
  #photoUrl: string;
  #capturedAt: string;

  constructor(props: {
    id: string;
    photoUrl: string;
    capturedAt: string;
  }) {
    super(props.id);
    this.#photoUrl = props.photoUrl;
    this.#capturedAt = props.capturedAt;
  }

  get photoUrl(): string {
    return this.#photoUrl;
  }

  get capturedAt(): string {
    return this.#capturedAt;
  }
}
