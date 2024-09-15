import { v4 as uuid } from "uuid";

import { ProductEntity } from "../product.entity";
import { ProductInterface } from "../product.interface";

export class ProductFactory {
  static create(name: string, price: number): ProductInterface {
    return new ProductEntity(uuid(), name, price);
  }
}
