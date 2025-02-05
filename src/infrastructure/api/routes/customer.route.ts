import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/create", async (request: Request, response: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDTO = {
      name: request.body.name,
      address: {
        street: request.body.address.street,
        city: request.body.address.city,
        state: request.body.address.state,
        zipCode: request.body.address.zipCode,
      },
    };

    const output = await useCase.execute(customerDTO);
    response.status(201).send(output);
  } catch (err) {
    response.status(500).send(err);
  }
});
