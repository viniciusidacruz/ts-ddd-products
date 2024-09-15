import { ProductFactory } from "./product.factory";

describe("Product factory tests", () => {
  describe("Success ✅", () => {
    it("Should create a Product type default", () => {
      const product = ProductFactory.create("Default", "Product Default", 10);

      expect(product.id).toBeDefined();
      expect(product.name).toEqual("Product Default");
      expect(product.price).toEqual(10);
    });

    it("Should create a Product type multiply", () => {
      const product = ProductFactory.create("Multiply", "Product Multiply", 10);

      expect(product.id).toBeDefined();
      expect(product.name).toEqual("Product Multiply");
      expect(product.price).toEqual(20);
    });
  });

  describe("Error ❌", () => {
    it("Should throw an error when creating a product with unsupported type", () => {
      expect(() => {
        ProductFactory.create("Unsupported" as any, "Product Unsupported", 10);
      }).toThrow("Product type not supported");
    });
  });
});
