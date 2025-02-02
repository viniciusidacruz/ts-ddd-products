import { CustomerRepositoryInterface } from "../../../domain/customer/repositories";
import {
  InputListCustomerDTO,
  OutputListCustomerDTO,
} from "./list.customer.dto";
import { OutputMapper } from "./list.customer.factory";

export class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOutput(customers);
  }
}


