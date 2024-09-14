import { Sequelize } from "sequelize";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize("database", "username", "password", {
      dialect: "sqlite",
      logging: false,
      storage: ":memory:",
      sync: { force: true },
    });

    afterEach(async () => {
      await sequelize.close();
    });
  });
});
