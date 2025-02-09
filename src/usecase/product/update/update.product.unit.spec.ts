import { ProductFactory } from "../../../domain/product/entity/factory/product.factory";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create("One", 1);

const input = {
  id: product.getId(),
  name: "Updated",
  price: 2,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test use case update product", () => {
  it("should update product", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
