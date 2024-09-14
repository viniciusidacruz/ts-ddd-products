import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../database/sequelize/models";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize("database", "username", "password", {
      dialect: "sqlite",
      logging: false,
      storage: ":memory:",
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
