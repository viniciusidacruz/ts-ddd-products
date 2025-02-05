import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { OrderModel } from "../order/order.model";
import { ProductModel } from "../product/repository/sequelize/product.model";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";

export const app: Express = express();
app.use(express.json());

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    logging: false,
    storage: ":memory:",
    sync: { force: true },
  });

  await sequelize.addModels([CustomerModel, ProductModel, OrderModel]);
  await sequelize.sync();
}

setupDb();
