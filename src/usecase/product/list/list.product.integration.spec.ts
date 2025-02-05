import { Sequelize } from "sequelize-typescript";

import { ListProductUserCase } from "./list.product.usecase";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductEntity } from "../../../domain/product/entity/product.entity";

describe("Unit test for list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize("database", "username", "password", {
      dialect: "sqlite",
      logging: false,
      storage: ":memory:",
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUserCase(productRepository);

    const productOne = new ProductEntity("1", "One", 1);

    await productRepository.create(productOne);

    const output = await listProductUseCase.execute({});

    expect(output.products.length).toBe(1);
  });
});
