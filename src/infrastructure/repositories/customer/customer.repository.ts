import { AddressEntity, CustomerEntity } from "../../../domain/entities";
import { CustomerRepositoryInterface } from "../../../domain/repositories";

import { CustomerModel } from "../../database/sequelize/models";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: CustomerEntity): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address?.street,
      zipCode: entity.address?.zipCode,
      city: entity.address?.city,
      state: entity.address?.state,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: CustomerEntity): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address?.street,
        zipCode: entity.Address?.zipCode,
        city: entity.Address?.street,
        state: entity.Address?.state,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<CustomerEntity> {
    const customerModel = await CustomerModel.findOne({
      where: {
        id,
      },
      rejectOnEmpty: true,
    });

    const customer = new CustomerEntity(id, customerModel.name);
    const address = new AddressEntity(
      customerModel.street,
      customerModel.city,
      customerModel.state,
      customerModel.zipCode
    );

    customer.Address = address;

    return customer;
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.destroy({ where: { id } });
  }

  async findAll(): Promise<CustomerEntity[]> {
    const customersModels = await CustomerModel.findAll();

    const customers = customersModels.map((customerModel) => {
      let customer = new CustomerEntity(customerModel.id, customerModel.name);

      customer.addRewardPoints(customerModel.rewardPoints);
      const address = new AddressEntity(
        customerModel.street,
        customerModel.city,
        customerModel.state,
        customerModel.zipCode
      );

      customer.Address = address;

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    });

    return customers;
  }
}
