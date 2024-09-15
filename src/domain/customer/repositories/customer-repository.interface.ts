import { CustomerEntity } from "../entity/customer.entity";
import { RepositoryInterface } from "../../@shared/repositories/repository-interface";

export interface CustomerRepositoryInterface
  extends RepositoryInterface<CustomerEntity> {}
