export class OrderItemEntity {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _productId: string;

  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    productId: string
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._productId = productId;
    this.validate();
  }

  get quantity(): number {
    return this._quantity;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
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
}
