import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "One",
  price: 1,
};

describe("Integration test create product use case", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });
});
