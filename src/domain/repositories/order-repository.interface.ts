import { OrderEntity } from "../entities";
import { RepositoryInterface } from "./repository-interface";

export interface OrderRepositoryInterface
  extends RepositoryInterface<OrderEntity> {}
