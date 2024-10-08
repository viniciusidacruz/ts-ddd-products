import { ProductEntity } from "../entity/product.entity";

export class ProductService {
  static increasePrice(products: ProductEntity[], percentage: number): void {
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
  }
}
