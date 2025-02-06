import express, { Request, Response } from "express";

import { FindProductUseCase } from "../../../usecase/product/find/find.product.usecase";
import { ProductRepository } from "../../product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { UpdateProductUseCase } from "../../../usecase/product/update/update.product.usecase";
import { ListProductUserCase } from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/create", async (request: Request, response: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDTO = {
      name: request.body.name,
      price: request.body.price,
    };

    const output = await useCase.execute(productDTO);
    response.status(201).send(output);
  } catch (err) {
    response.status(500).send(err);
  }
});

productRoute.get(
  "/:id/details",
  async (request: Request, response: Response) => {
    const useCase = new FindProductUseCase(new ProductRepository());

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

productRoute.get("/list", async (request: Request, response: Response) => {
  const useCase = new ListProductUserCase(new ProductRepository());

  try {
    const output = await useCase.execute({});

    response.status(200).send(output);
  } catch (err) {
    response.status(500).send(err);
  }
});

productRoute.put(
  "/:id/update",
  async (request: Request, response: Response) => {
    const useCase = new UpdateProductUseCase(new ProductRepository());

    const productDTO = {
      name: request.body.name,
      price: request.body.price,
    };

    try {
      const output = await useCase.execute({
        id: request.params.id,
        ...productDTO,
      });
      response.status(200).send(output);
    } catch (err) {
      response.status(500).send(err);
    }
  }
);