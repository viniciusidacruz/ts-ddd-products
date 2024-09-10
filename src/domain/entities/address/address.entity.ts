export class AddressEntity {
  _street: string;
  _city: string;
  _state: string;
  _zipCode: string;

  constructor(street: string, city: string, state: string, zipCode: string) {
    this._street = street;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
    this.validate();
  }

  validate(): void {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }

    if (this._city.length === 0) {
      throw new Error("City is required");
    }

    if (this._state.length === 0) {
      throw new Error("State is required");
    }

    if (this._zipCode.length === 0) {
      throw new Error("Zip code is required");
    }
  }

  toString(): string {
    return `${this._street}, ${this._city}, ${this._state} ${this._zipCode}`;
  }
}
