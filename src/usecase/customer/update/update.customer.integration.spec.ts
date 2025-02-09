import { Sequelize } from "sequelize-typescript";

import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { AddressEntity } from "../../../domain/customer/value-objects";
import { UpdateCustomerUseCase } from "./update.customer.usecase";
import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { CustomerEntity } from "../../../domain/customer/entity/customer.entity";

const input = {
  id: "ae594473-6724-4b7e-a0e6-f8704e904b01",
  name: "John Updated",
  address: {
    street: "Nova rua",
    city: "Nova cidade",
    state: "São Paulo",
    zipCode: "09421-540",
  },
};

describe("Integration test use case update customer", () => {
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

  it("should update customer", async () => {
    const customerRepository = new CustomerRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

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

    const output = await updateCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
