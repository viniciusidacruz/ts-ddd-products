import { AddressEntity } from "../address/address.entity";

export class CustomerEntity {
  private _id: string;
  private _name: string;
  private _address!: AddressEntity;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }

  get address(): AddressEntity {
    return this._address;
  }

  isActive(): boolean {
    return this._active;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    return true;
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

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  set Address(address: AddressEntity) {
    this._address = address;
  }
}
