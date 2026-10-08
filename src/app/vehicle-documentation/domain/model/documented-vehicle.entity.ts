import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class DocumentedVehicle implements BaseEntity {
  #id: string;
  #plate: string;

  constructor(props: { id: string; plate: string }) {
    this.#id = props.id;
    this.#plate = props.plate;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get plate(): string {
    return this.#plate;
  }

  set plate(value: string) {
    this.#plate = value;
  }
}
