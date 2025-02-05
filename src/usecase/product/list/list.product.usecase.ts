import { ProductRepositoryInterface } from "../../../domain/product/repositories";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";
import { OutputMapper } from "./list.product.factory";

export class ListProductUserCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute({}: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll();

    return OutputMapper.toOutput(products);
  }
}
