import { ProductEntity } from "../entity/product.entity";
import { RepositoryInterface } from "../../@shared/repositories/repository-interface";

export interface ProductRepositoryInterface
  extends RepositoryInterface<ProductEntity> {}
