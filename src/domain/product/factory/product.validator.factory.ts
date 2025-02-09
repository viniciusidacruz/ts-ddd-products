import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { ProductEntity } from "../entity/product.entity";
import { ProductYupValidator } from "../validator/product.yup.validator";

export class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductEntity> {
    return new ProductYupValidator();
  }
}
