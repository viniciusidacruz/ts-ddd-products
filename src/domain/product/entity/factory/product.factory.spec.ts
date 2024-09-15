import { ProductFactory } from "./product.factory";

describe("Product factory tests", () => {
  it("Should create a new product", () => {
    const product = ProductFactory.create("Product Default", 10);

    expect(product.id).toBeDefined();
    expect(product.name).toEqual("Product Default");
    expect(product.price).toEqual(10);
  });
});
