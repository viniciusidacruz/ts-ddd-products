import { Sequelize } from "sequelize-typescript";

import { AddressEntity } from "../../../domain/customer/value-objects";
import { DeleteCustomerUseCase } from "./delete.customer.usecase";
import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerEntity } from "../../../domain/customer/entity/customer.entity";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";

describe("Unit test use case delete a customer", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize("database", "username", "password", {
      dialect: "sqlite",
      logging: false,
      storage: ":memory:",
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should delete a customer", async () => {
    const customerRepository = new CustomerRepository();
    const deleteUserCaseCustomer = new DeleteCustomerUseCase(
      customerRepository
    );

    const customer = new CustomerEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "John Doe"
    );
    const address = new AddressEntity(
      "Av. Papa João XXIII, 695",
      "Ribeirão Pires",
      "São Paulo",
      "09421-540"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const input = {
      id: customer.getId(),
    };

    await deleteUserCaseCustomer.execute(input);

    await expect(customerRepository.find(customer.getId())).rejects.toThrow();
  });
});
