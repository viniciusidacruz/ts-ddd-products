import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../database/sequelize/models";
import { ProductRepository } from "./product.repository";
import { ProductEntity } from "../../../domain/product/entity/product.entity";

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

  it("Should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "Product One",
      10
    );

    await productRepository.create(product);

    const savedProduct = await ProductModel.findOne({
      where: { id: "ae594473-6724-4b7e-a0e6-f8704e904b01" },
    });

    expect(savedProduct.toJSON()).toStrictEqual({
      id: savedProduct.id,
      name: savedProduct.name,
      price: savedProduct.price,
    });
  });

  it("Should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "Product One",
      10
    );

    await productRepository.create(product);

    product.changeName("Updated Product");
    await productRepository.update(product);

    const savedProduct = await ProductModel.findOne({
      where: { id: "ae594473-6724-4b7e-a0e6-f8704e904b01" },
    });

    expect(savedProduct.toJSON()).toStrictEqual({
      id: savedProduct.id,
      name: savedProduct.name,
      price: savedProduct.price,
    });
  });

  it("Should find a product by ID", async () => {
    const productRepository = new ProductRepository();
    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "Product One",
      10
    );

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: "ae594473-6724-4b7e-a0e6-f8704e904b01" },
    });

    const foundProduct = await productRepository.find(
      "ae594473-6724-4b7e-a0e6-f8704e904b01"
    );

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("Should delete a product by ID", async () => {
    const productRepository = new ProductRepository();
    const product = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "Product One",
      10
    );

    await productRepository.create(product);

    await productRepository.delete("ae594473-6724-4b7e-a0e6-f8704e904b01");

    const deletedProduct = await ProductModel.findOne({
      where: { id: "ae594473-6724-4b7e-a0e6-f8704e904b01" },
    });

    expect(deletedProduct).toBeNull();
  });

  it("Should find all products", async () => {
    const productRepository = new ProductRepository();
    const productOne = new ProductEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "Product One",
      10
    );
    await productRepository.create(productOne);

    const productTwo = new ProductEntity(
      "879cb9f9-a677-4721-a96c-b93075e8bd00",
      "Product Two",
      20
    );
    await productRepository.create(productTwo);

    const foundProducts = await productRepository.findAll();
    const products = [productOne, productTwo];

    expect(foundProducts).toEqual(products);
  });
});
