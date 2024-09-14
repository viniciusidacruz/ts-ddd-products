import { CustomerEntity } from "../entities";
import { RepositoryInterface } from "./repository-interface";

export interface CustomerRepositoryInterface
  extends RepositoryInterface<CustomerEntity> {}
