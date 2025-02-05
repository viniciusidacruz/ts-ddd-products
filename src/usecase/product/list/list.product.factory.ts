import { ProductEntity } from "../../../domain/product/entity/product.entity";
import { OutputListProductDTO } from "./list.product.dto";

export class OutputMapper {
  static toOutput(products: ProductEntity[]): OutputListProductDTO {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
