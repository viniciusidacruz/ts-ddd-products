import { ProductFactory } from "../../../domain/product/entity/factory/product.factory";
import { ListProductUserCase } from "./list.product.usecase";

const productOne = ProductFactory.create("One", 1);
const productTwo = ProductFactory.create("Two", 2);

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([productOne, productTwo])),
  };
};

describe("Unit test for list product use case", () => {
  it("should list all products", async () => {
    const productRepository = MockRepository();
    const listProductUseCase = new ListProductUserCase(productRepository);

    const output = await listProductUseCase.execute({});

    expect(output.products.length).toBe(2);
  });
});
