import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "../../../usecase/customer/find/find.customer.usecase";
import { ListCustomerUseCase } from "../../../usecase/customer/list/list.customer.usecase";
import { UpdateCustomerUseCase } from "../../../usecase/customer/update/update.customer.usecase";
import { DeleteCustomerUseCase } from "../../../usecase/customer/delete/delete.customer.usecase";

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

customerRoute.get("/list", async (request: Request, response: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const output = await useCase.execute({});

    response.status(200).send(output);
  } catch (err) {
    response.status(500).send(err);
  }
});

customerRoute.put(
  "/:id/update",
  async (request: Request, response: Response) => {
    const useCase = new UpdateCustomerUseCase(new CustomerRepository());

    const customerDTO = {
      name: request.body.name,
      address: {
        street: request.body.address.street,
        city: request.body.address.city,
        state: request.body.address.state,
        zipCode: request.body.address.zipCode,
      },
    };

    try {
      const output = await useCase.execute({
        id: request.params.id,
        ...customerDTO,
      });
      response.status(200).send(output);
    } catch (err) {
      response.status(500).send(err);
    }
  }
);

customerRoute.delete(
  "/:id/delete",
  async (request: Request, response: Response) => {
    const useCase = new DeleteCustomerUseCase(new CustomerRepository());

    try {
      await useCase.execute({
        id: request.params.id,
      });
      response.status(204).send();
    } catch (err) {
      response.status(500).send(err);
    }
  }
);
