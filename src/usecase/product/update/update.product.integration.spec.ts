import { Sequelize } from "sequelize-typescript";

import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { UpdateProductUseCase } from "./update.product.usecase";
import { ProductEntity } from "../../../domain/product/entity/product.entity";

const input = {
  id: "ae594473-6724-4b7e-a0e6-f8704e904b01",
  name: "Updated",
  price: 2,
};

describe("Integration test use case update product", () => {
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

  it("should update product", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "One",
      1
    );

    await productRepository.create(product);

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
