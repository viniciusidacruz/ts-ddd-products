import { OrderItemEntity } from "..";

describe("OrderItem unit tests", () => {
  describe("Error ❌", () => {
    it("Should throw error when id is empty", () => {
      expect(() => {
        new OrderItemEntity(
          "",
          "Web Design",
          1500,
          2,
          "ffb8f787-76ed-42ca-a56c-1fb832178467"
        );
      }).toThrow("ID is required");
    });

    it("Should throw error when name is empty", () => {
      expect(() => {
        new OrderItemEntity(
          "07556a1c-7b82-4104-94b1-cb8cab474a19",
          "",
          1500,
          2,
          "ffb8f787-76ed-42ca-a56c-1fb832178467"
        );
      }).toThrow("Name is required");
    });
  });

  describe("Success ✅", () => {
    it("Should create valid order", () => {
      const order = new OrderItemEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "Landing Page",
        1500,
        2,
        "ffb8f787-76ed-42ca-a56c-1fb832178467"
      );

      expect(order.validate()).toBeTruthy();
    });

    it("Should calculator to multiply", () => {
      const order = new OrderItemEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "Landing Page",
        1500,
        2,
        "ffb8f787-76ed-42ca-a56c-1fb832178467"
      );

      expect(order.orderItemTotal()).toBe(3000);
    });
  });
});
