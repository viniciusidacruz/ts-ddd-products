import { ProductEntity } from "../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../domain/product/repositories";
import { ProductModel } from "../../database/sequelize/models";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: ProductEntity): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: ProductEntity): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<ProductEntity> {
    const product = await ProductModel.findOne({ where: { id } });

    return new ProductEntity(product.id, product.name, product.price);
  }

  async delete(id: string): Promise<void> {
    await ProductModel.destroy({ where: { id } });
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await ProductModel.findAll();

    return products.map(
      (product) => new ProductEntity(product.id, product.name, product.price)
    );
  }
}
