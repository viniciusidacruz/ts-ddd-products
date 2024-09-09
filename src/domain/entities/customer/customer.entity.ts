import { AddressEntity } from "../address/address.entity";

export class CustomerEntity {
  _id: string;
  _name: string;
  _address!: AddressEntity;
  _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate(): void {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is required to activate customer");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set Address(address: AddressEntity) {
    this._address = address;
  }
}
