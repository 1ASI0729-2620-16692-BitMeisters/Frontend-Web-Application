import { BaseEntity } from './base-entity';

export abstract class AuditableAggregateRoot extends BaseEntity {
  protected constructor(
    id: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    super(id);
  }
}
