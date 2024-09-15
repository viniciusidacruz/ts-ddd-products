import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../database/sequelize/models";
import { CustomerRepository } from "./customer.repository";
import { CustomerEntity } from "../../../domain/customer/entity/customer.entity";
import { AddressEntity } from "../../../domain/customer/value-objects";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize("database", "username", "password", {
      dialect: "sqlite",
      logging: false,
      storage: ":memory:",
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const customerRepository = new CustomerRepository();
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

    const savedCustomer = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(savedCustomer.toJSON()).toStrictEqual({
      id: savedCustomer.id,
      name: savedCustomer.name,
      active: savedCustomer.active,
      street: savedCustomer.street,
      city: savedCustomer.city,
      state: savedCustomer.state,
      zipCode: savedCustomer.zipCode,
      rewardPoints: savedCustomer.rewardPoints,
    });
  });

  it("Should update a customer", async () => {
    const customerRepository = new CustomerRepository();
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

    customer.changeName("Jane Doe");
    customer.activate();
    customer.addRewardPoints(100);

    await customerRepository.update(customer);

    const updatedCustomer = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(updatedCustomer.toJSON()).toStrictEqual({
      id: updatedCustomer.id,
      name: updatedCustomer.name,
      active: updatedCustomer.active,
      street: updatedCustomer.street,
      city: updatedCustomer.city,
      state: updatedCustomer.state,
      zipCode: updatedCustomer.zipCode,
      rewardPoints: updatedCustomer.rewardPoints,
    });
  });

  it("Should find customer by id", async () => {
    const customerRepository = new CustomerRepository();
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

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("Should delete a customer", async () => {
    const customerRepository = new CustomerRepository();
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

    await customerRepository.delete(customer.id);

    const deletedCustomer = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(deletedCustomer).toBeNull();
  });

  it("Should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customerOne = new CustomerEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b01",
      "John Doe"
    );
    const customerTwo = new CustomerEntity(
      "ae594473-6724-4b7e-a0e6-f8704e904b02",
      "Jane Doe"
    );

    const addressOne = new AddressEntity(
      "Av. Papa João XXIII, 695",
      "Ribeirão Pires",
      "São Paulo",
      "09421-540"
    );
    const addressTwo = new AddressEntity(
      "Rua dos Bobos, 123",
      "Cidade dos Bobos",
      "São Paulo",
      "09876-543"
    );

    customerOne.changeAddress(addressOne);
    customerTwo.changeAddress(addressTwo);

    await customerRepository.create(customerOne);
    await customerRepository.create(customerTwo);

    const customers = await customerRepository.findAll();

    expect(customers).toEqual([customerOne, customerTwo]);
  });
});
