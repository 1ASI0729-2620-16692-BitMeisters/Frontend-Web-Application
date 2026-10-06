import { BaseEntity } from './base-entity';

class Vehicle extends BaseEntity {
  constructor(id: string) {
    super(id);
  }
}

class Driver extends BaseEntity {
  constructor(id: string) {
    super(id);
  }
}

describe('BaseEntity', () => {
  it('equals another instance of the same class with the same id', () => {
    expect(new Vehicle('abc').equals(new Vehicle('abc'))).toBe(true);
  });

  it('differs from an instance of the same class with another id', () => {
    expect(new Vehicle('abc').equals(new Vehicle('xyz'))).toBe(false);
  });

  it('differs from an instance of another class with the same id', () => {
    expect(new Vehicle('abc').equals(new Driver('abc'))).toBe(false);
  });
});
