import { Sequelize } from "sequelize-typescript";

import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { AddressEntity } from "../../../domain/customer/value-objects";
import { CustomerEntity } from "../../../domain/customer/entity/customer.entity";
import { FindCustomerUseCase } from "../find/find.customer.usecase";
import { CustomerFactory } from "../../../domain/customer/entity/factory/customer.factory";
import { ListCustomerUseCase } from "./list.customer.usecase";

describe("Test integration list customers use case", () => {
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

  it("should list all customers", async () => {
    const customerRepository = new CustomerRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

    const customerOne = new CustomerEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "John Doe"
    );
    const addressOne = new AddressEntity(
      "Av. Papa João XXIII, 695",
      "Ribeirão Pires",
      "São Paulo",
      "09421-540"
    );

    customerOne.changeAddress(addressOne);

    await customerRepository.create(customerOne);

    const output = await listCustomerUseCase.execute({});

    expect(output.customers.length).toBe(1);
  });
});
