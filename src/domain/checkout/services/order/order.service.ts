import { v4 as uuid } from "uuid";

import { OrderEntity, OrderItemEntity } from "../../entities";
import { CustomerEntity } from "../../../customer/entity/customer.entity";

export class OrderService {
  static total(orders: OrderEntity[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }

  static placeOrder(
    customer: CustomerEntity,
    items: OrderItemEntity[]
  ): OrderEntity {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new OrderEntity(uuid(), customer.id, items);

    customer.addRewardPoints(order.total() / 2);

    return order;
  }
}
