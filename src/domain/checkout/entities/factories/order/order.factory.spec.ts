import { v4 as uuid } from "uuid";

import { OrderFactory } from "./order.factory";

describe("Order Factory tests", () => {
  it("Should create a new order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "Item One",
          productId: uuid(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
