import { OrderEntity } from "../entities";
import { RepositoryInterface } from "../../@shared/repositories/repository-interface";

export interface OrderRepositoryInterface
  extends RepositoryInterface<OrderEntity> {}
