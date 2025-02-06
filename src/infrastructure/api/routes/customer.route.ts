import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "../../../usecase/customer/find/find.customer.usecase";

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

customerRoute.get(
  "/:id/details",
  async (request: Request, response: Response) => {
    const useCase = new FindCustomerUseCase(new CustomerRepository());

    try {
      const output = await useCase.execute({
        id: request.params.id,
      });
      response.status(200).send(output);
    } catch (err) {
      response.status(500).send(err);
    }
  }
);
