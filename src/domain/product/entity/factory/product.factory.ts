import { v4 as uuid } from "uuid";

import { ProductEntity } from "../product.entity";

export class ProductFactory {
  static create(name: string, price: number): ProductEntity {
    return new ProductEntity(uuid(), name, price);
  }
}
