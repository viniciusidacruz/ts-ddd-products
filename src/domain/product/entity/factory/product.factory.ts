import { v4 as uuid } from "uuid";

import { ProductEntity } from "../product.entity";
import { ProductInterface } from "../product.interface";
import { ProductMultiplyEntity } from "../product-multiply.entity ";

export class ProductFactory {
  static create(
    type: "Default" | "Multiply",
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "Default":
        return new ProductEntity(uuid(), name, price);
      case "Multiply":
        return new ProductMultiplyEntity(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
