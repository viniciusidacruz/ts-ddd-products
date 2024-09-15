import { OrderItemEntity } from "..";
import { OrderInterface } from "./order.interface";

export class OrderEntity implements OrderInterface {
  private _id: string;
  private _customerId: string;
  private _items: OrderItemEntity[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItemEntity[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
    this._total = this.total();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItemEntity[] {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }

  validate(): boolean {
    if (this._customerId.length === 0) {
      throw new Error("Customer ID is required");
    }

    if (this._id.length === 0) {
      throw new Error("ID is required");
    }

    if (this._items.length === 0) {
      throw new Error("At least one item is required");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than zero");
    }

    return true;
  }
}
