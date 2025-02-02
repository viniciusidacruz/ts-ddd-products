import { Sequelize } from "sequelize-typescript";

import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { AddressEntity } from "../../../domain/customer/value-objects";
import { CustomerEntity } from "../../../domain/customer/entity/customer.entity";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Test integration find customer use case", () => {
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

  it("Should find a customer by id", async () => {
    const customerRepository = new CustomerRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

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
      id: "ae594473-6724-4b7e-a0e6-f8704e904b01",
    };

    const output = {
      id: "ae594473-6724-4b7e-a0e6-f8704e904b01",
      name: "John Doe",
      rewardPoints: 0,
      active: false,
      address: {
        street: "Av. Papa João XXIII, 695",
        city: "Ribeirão Pires",
        state: "São Paulo",
        zipCode: "09421-540",
      },
    };

    const result = await findCustomerUseCase.execute(input);

    expect(result).toEqual(output);
  });
});
