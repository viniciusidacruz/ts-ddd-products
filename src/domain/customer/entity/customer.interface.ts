import { AddressEntity } from "../value-objects";

export interface CustomerInterface {
  get id(): string;
  get name(): string;
  get address(): AddressEntity;
  get rewardPoints(): number;
}
