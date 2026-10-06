export interface BaseEntity<TId extends string | number = string | number> {
  id: TId;
}
