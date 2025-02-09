import { ProductFactory } from "../../../domain/product/entity/factory/product.factory";
import { ProductRepositoryInterface } from "../../../domain/product/repositories";
import {
  InputCreateProductDTO,
  OutputCreateProductDTO,
} from "./create.product.dto";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = ProductFactory.create(input.name, input.price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
