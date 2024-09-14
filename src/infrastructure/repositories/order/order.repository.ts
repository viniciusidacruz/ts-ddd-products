import { OrderEntity, OrderItemEntity } from "../../../domain/entities";
import { OrderRepositoryInterface } from "../../../domain/repositories/order-repository.interface";

import { OrderItemModel, OrderModel } from "../../database/sequelize/models";

export class OrderRepository implements OrderRepositoryInterface {
  async update(entity: OrderEntity): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
      },
      { where: { id: entity.id } }
    );

    for (const item of entity.items) {
      await OrderItemModel.update(
        {
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        },
        { where: { id: item.id, order_id: entity.id } }
      );
    }
  }

  async find(id: string): Promise<OrderEntity> {
    const order = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }],
    });

    return new OrderEntity(
      order.id,
      order.customer_id,
      order.items.map(
        (item) =>
          new OrderItemEntity(
            item.id,
            item.name,
            item.price,
            item.quantity,
            item.product_id
          )
      )
    );
  }

  async delete(id: string): Promise<void> {
    await OrderModel.destroy({ where: { id } });
  }

  async findAll(): Promise<OrderEntity[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orders.map(
      (order) =>
        new OrderEntity(
          order.id,
          order.customer_id,
          order.items.map(
            (item) =>
              new OrderItemEntity(
                item.id,
                item.name,
                item.price,
                item.quantity,
                item.product_id
              )
          )
        )
    );
  }

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
