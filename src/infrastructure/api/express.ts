import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { ProductModel } from "../product/repository/sequelize/product.model";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";
import { OrderItemModel } from "../order/order-item";
import { OrderModel } from "../order/order.model";

import { productRoute } from "./routes/product.route";
import { customerRoute } from "./routes/customer.route";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    logging: false,
    storage: ":memory:",
    sync: { force: true },
  });

  await sequelize.addModels([
    CustomerModel,
    ProductModel,
    OrderModel,
    OrderItemModel,
  ]);
  await sequelize.sync();
}

setupDb();
