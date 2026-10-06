export interface BaseResponse {}

export interface BaseResource<TId extends string | number = string | number> {
  id: TId;
}
