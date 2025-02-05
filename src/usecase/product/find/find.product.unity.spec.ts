import { ProductEntity } from "../../../domain/product/entity/product.entity";
import { FindProductUseCase } from "./find.product.usecase";

const product = new ProductEntity("1", "One", 1);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test for find a product use case", () => {
  it("should be return a product by id", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "One",
      price: 1,
    };

    const result = await findProductUseCase.execute(input);

    expect(result).toEqual(output);
  });
});
