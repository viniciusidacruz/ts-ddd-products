import { Sequelize } from "sequelize-typescript";
import {
  OrderModel,
  ProductModel,
  CustomerModel,
  OrderItemModel,
} from "../../database/sequelize/models";

import { CustomerRepository, ProductRepository } from "..";
import { OrderRepository } from "./order.repository";
import { CustomerEntity } from "../../../domain/customer/entity/customer.entity";
import { AddressEntity } from "../../../domain/customer/value-objects";
import {
  OrderEntity,
  OrderItemEntity,
} from "../../../domain/checkout/entities";
import { ProductEntity } from "../../../domain/product/entity/product.entity";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize("database", "username", "password", {
      dialect: "sqlite",
      logging: false,
      storage: ":memory:",
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new CustomerEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "John Doe"
    );
    const address = new AddressEntity(
      "Av. Papa João XXIII, 695",
      "Ribeirão Pires",
      "São Paulo",
      "09421-540"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b02",
      "Product One",
      15
    );
    await productRepository.create(product);

    const orderItem = new OrderItemEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      product.name,
      product.price,
      2,
      product.id
    );

    const order = new OrderEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      customer.id,
      [orderItem]
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });
  });

  it("Should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new CustomerEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "John Doe"
    );
    const address = new AddressEntity(
      "Av. Papa João XXIII, 695",
      "Ribeirão Pires",
      "São Paulo",
      "09421-540"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b02",
      "Product One",
      15
    );
    await productRepository.create(product);

    const orderItem = new OrderItemEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      product.name,
      product.price,
      2,
      product.id
    );

    const order = new OrderEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      customer.id,
      [orderItem]
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const updatedOrderItem = new OrderItemEntity(
      orderItem.id,
      "Updated Product",
      20,
      3,
      product.id
    );

    const updatedOrder = new OrderEntity(order.id, customer.id, [
      updatedOrderItem,
    ]);

    await orderRepository.update(updatedOrder);

    const updatedOrderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(updatedOrderModel.toJSON()).toStrictEqual({
      id: updatedOrder.id,
      customer_id: updatedOrder.customerId,
      total: updatedOrder.total(),
      items: [
        {
          id: updatedOrderItem.id,
          name: updatedOrderItem.name,
          price: updatedOrderItem.price,
          quantity: updatedOrderItem.quantity,
          order_id: updatedOrder.id,
          product_id: product.id,
        },
      ],
    });
  });

  it("Should delete an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new CustomerEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "John Doe"
    );
    const address = new AddressEntity(
      "Av. Papa João XXIII, 695",
      "Ribeirão Pires",
      "São Paulo",
      "09421-540"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b02",
      "Product One",
      15
    );
    await productRepository.create(product);

    const orderItem = new OrderItemEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      product.name,
      product.price,
      2,
      product.id
    );

    const order = new OrderEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      customer.id,
      [orderItem]
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    await orderRepository.delete(order.id);

    const deletedOrder = await OrderModel.findOne({
      where: { id: order.id },
    });

    expect(deletedOrder).toBeNull();
  });

  it("Should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new CustomerEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "John Doe"
    );
    const address = new AddressEntity(
      "Av. Papa João XXIII, 695",
      "Ribeirão Pires",
      "São Paulo",
      "09421-540"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b02",
      "Product One",
      15
    );
    await productRepository.create(product);

    const orderItem = new OrderItemEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      product.name,
      product.price,
      2,
      product.id
    );

    const order = new OrderEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      customer.id,
      [orderItem]
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const allOrders = await orderRepository.findAll();

    expect(allOrders).toHaveLength(1);
  });

  it("Should find order by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new CustomerEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "John Doe"
    );
    const address = new AddressEntity(
      "Av. Papa João XXIII, 695",
      "Ribeirão Pires",
      "São Paulo",
      "09421-540"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b02",
      "Product One",
      15
    );
    await productRepository.create(product);

    const orderItem = new OrderItemEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      product.name,
      product.price,
      2,
      product.id
    );

    const order = new OrderEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b03",
      customer.id,
      [orderItem]
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(order).toStrictEqual(foundOrder);
  });
});
