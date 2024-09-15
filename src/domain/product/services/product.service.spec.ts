import { ProductEntity } from "../entity/product.entity";

import { ProductService } from "./product.service";

describe("Product service unit tests", () => {
  it("Should change the prices of all products", () => {
    const productOne = new ProductEntity(
      "ffb8f787-76ed-42ca-a56c-1fb832178467",
      "Marketing",
      1000
    );
    const productTwo = new ProductEntity(
      "879cb9f9-a677-4721-a96c-b93075e8bd00",
      "Sales",
      1200
    );
    const products = [productOne, productTwo];

    ProductService.increasePrice(products, 100);

    expect(productOne.price).toBe(2000);
    expect(productTwo.price).toBe(2400);
  });
});
