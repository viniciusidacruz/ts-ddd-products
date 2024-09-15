import { OrderEntity, OrderItemEntity } from "..";

describe("Order unit tests", () => {
  describe("Error ❌", () => {
    it("Should throw error when id is empty", () => {
      expect(() => {
        new OrderEntity("", "07556a1c-7b82-4104-94b1-cb8cab474a19", []);
      }).toThrow("ID is required");
    });

    it("Should throw error when customerId is empty", () => {
      expect(() => {
        new OrderEntity("07556a1c-7b82-4104-94b1-cb8cab474a19", "", []);
      }).toThrow("ID is required");
    });

    it("Should throw error when items is empty", () => {
      expect(() => {
        new OrderEntity(
          "07556a1c-7b82-4104-94b1-cb8cab474a19",
          "07556a1c-7b82-4104-94b1-cb8cab474a19",
          []
        );
      }).toThrow("At least one item is required");
    });

    it("Should throw error when quantity is less or equal zero", () => {
      expect(() => {
        const item1 = new OrderItemEntity(
          "07556a1c-7b82-4104-94b1-cb8cab474a19",
          "Landing Page",
          1500,
          0,
          "ffb8f787-76ed-42ca-a56c-1fb832178467"
        );

        new OrderEntity(
          "07556a1c-7b82-4104-94b1-cb8cab474a19",
          "07556a1c-7b82-4104-94b1-cb8cab474a19",
          [item1]
        );
      }).toThrow("Quantity must be greater than zero");
    });
  });

  describe("Success ✅", () => {
    it("Should create valid order", () => {
      const item1 = new OrderItemEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "Landing Page",
        1500,
        2,
        "ffb8f787-76ed-42ca-a56c-1fb832178467"
      );
      const item2 = new OrderItemEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "Home Page",
        2000,
        1,
        "07556a1c-7b82-4104-94b1-cb8cab474a19"
      );

      const order = new OrderEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        [item1, item2]
      );

      expect(order.total()).toBe(5000);
    });

    it("Should validate order", () => {
      const item1 = new OrderItemEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "Landing Page",
        1500,
        2,
        "ffb8f787-76ed-42ca-a56c-1fb832178467"
      );
      const item2 = new OrderItemEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "Home Page",
        2000,
        1,
        "07556a1c-7b82-4104-94b1-cb8cab474a19"
      );

      const order = new OrderEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        [item1, item2]
      );

      expect(order.validate()).toBeTruthy();
    });
  });
});
