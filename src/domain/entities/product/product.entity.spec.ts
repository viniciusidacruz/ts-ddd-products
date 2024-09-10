import { ProductEntity } from "./product.entity";

describe("Product unit tests", () => {
  describe("Error ❌", () => {
    it("Should throw an error when id is empty", () => {
      expect(() => {
        new ProductEntity("", "Product One", 100);
      }).toThrow("ID is required");
    });

    it("Should throw an error when name is empty", () => {
      expect(() => {
        new ProductEntity("07556a1c-7b82-4104-94b1-cb8cab474a19", "", 100);
      }).toThrow("Name is required");
    });

    it("Should throw an error when price is less than or equal to 0", () => {
      expect(() => {
        new ProductEntity(
          "07556a1c-7b82-4104-94b1-cb8cab474a19",
          "Product One",
          0
        );
      }).toThrow("Price must be greater than 0");
    });
  });

  describe("Success ✅", () => {
    it("Should create a valid product", () => {
      const product = new ProductEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "Product One",
        100
      );

      expect(product.validate()).toBeTruthy();
    });

    it("Should update a product's name", () => {
      const product = new ProductEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "Product One",
        100
      );
      product.changeName("Updated Product");

      expect(product.name).toBe("Updated Product");
    });

    it("should update price", () => {
      const product = new ProductEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "Product One",
        100
      );
      product.changePrice(200);

      expect(product.price).toBe(200);
    });
  });
});
