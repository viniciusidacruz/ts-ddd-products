import { CustomerEntity, OrderEntity, OrderItemEntity } from "../../entities";

import { OrderService } from "./order.service";

describe("Order service units tests", () => {
  describe("Success ✅", () => {
    it("Should place an order", () => {
      const customer = new CustomerEntity(
        "7151f2ca-7261-4556-bd6b-0c9b3f8f959e",
        "Vinicius Italo"
      );
      const orderItem1 = new OrderItemEntity(
        "7151f2ca-7261-4556-bd6b-0c9b3f8f959e",
        "Order 1",
        10,
        2,
        "da889daf-cfb2-4b48-8563-2ad2e0f25f4e"
      );
      const order = OrderService.placeOrder(customer, [orderItem1]);

      expect(customer.rewardPoints).toBe(10);
      expect(order.total()).toBe(20);
    });

    it("Should get total of all orders", () => {
      const orderItem1 = new OrderItemEntity(
        "7151f2ca-7261-4556-bd6b-0c9b3f8f959e",
        "Order 1",
        10,
        2,
        "da889daf-cfb2-4b48-8563-2ad2e0f25f4e"
      );
      const orderItem2 = new OrderItemEntity(
        "da889daf-cfb2-4b48-8563-2ad2e0f25f4e",
        "Order 1",
        10,
        2,
        "7151f2ca-7261-4556-bd6b-0c9b3f8f959e"
      );

      const order1 = new OrderEntity(
        "7151f2ca-7261-4556-bd6b-0c9b3f8f959e",
        "da889daf-cfb2-4b48-8563-2ad2e0f25f4e",
        [orderItem1]
      );

      const order2 = new OrderEntity(
        "9d2f25f1-c672-4669-bf3b-a58bd47245a8",
        "7c656495-81f0-4e6f-bb6c-d6986eddfc82",
        [orderItem2]
      );

      const total = OrderService.total([order1, order2]);

      expect(total).toBe(40);
    });
  });

  describe("Error ❌", () => {
    it("Should throw an error when the order is empty", () => {
      const customer = new CustomerEntity(
        "7151f2ca-7261-4556-bd6b-0c9b3f8f959e",
        "Vinicius Italo"
      );

      expect(() => {
        OrderService.placeOrder(customer, []);
      }).toThrow("Order must have at least one item");
    });
  });
});
