import { ProductEntity } from "../entities";
import { RepositoryInterface } from "./repository-interface";

export interface ProductRepository extends RepositoryInterface<ProductEntity> {}
