import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";

import { AddressEntity } from "../value-objects";

export class CustomerEntity extends Entity {
  private _name: string;
  private _address!: AddressEntity;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();

    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): AddressEntity {
    return this._address;
  }

  isActive(): boolean {
    return this._active;
  }

  validate(): boolean {
    if (this.id.length === 0) {
      this.notification.addError({
        context: "Customer",
        message: "ID is required",
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        context: "Customer",
        message: "Name is required",
      });
    }

    return true;
  }

  changeAddress(address: AddressEntity): void {
    this._address = address;
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
}
