import { OrderItemEntity } from "..";

export class OrderEntity {
  _id: string;
  _customerId: string;
  _items: OrderItemEntity[] = [];
  _total: number;

  constructor(id: string, customerId: string, items: OrderItemEntity[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
    this._total = this.total();
  }

  total(): number {
    return this._items.reduce((sum, item) => sum + item._price, 0);
  }

  validate(): void {
    if (this._customerId.length === 0) {
      throw new Error("Customer ID is required");
    }

    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
  }
}
