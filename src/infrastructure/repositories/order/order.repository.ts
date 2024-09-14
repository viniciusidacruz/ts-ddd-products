import { OrderEntity } from "../../../domain/entities";

import { OrderItemModel, OrderModel } from "../../database/sequelize/models";

export class OrderRepository {
  async create(entity: OrderEntity): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
