import { Sequelize } from "sequelize-typescript";

import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { AddressEntity } from "../../../domain/customer/value-objects";
import { CustomerEntity } from "../../../domain/customer/entity/customer.entity";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";
import { ProductEntity } from "../../../domain/product/entity/product.entity";

describe("Test integration find product use case", () => {
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

  it("Should find a product by id", async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "One",
      1
    );

    await productRepository.create(product);

    const input = {
      id: "ae594473-6724-4b7e-a0e6-f8704e904b01",
    };

    const output = {
      id: "ae594473-6724-4b7e-a0e6-f8704e904b01",
      name: "One",
      price: 1,
    };

    const result = await findProductUseCase.execute(input);

    expect(result).toEqual(output);
  });
});
