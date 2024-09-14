import { ProductEntity } from "../entities";
import { RepositoryInterface } from "./repository-interface";

export interface ProductRepositoryInterface
  extends RepositoryInterface<ProductEntity> {}
