import * as yup from "yup";

import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { ProductEntity } from "../entity/product.entity";

export class ProductYupValidator implements ValidatorInterface<ProductEntity> {
  validate(entity: ProductEntity): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("ID is required"),
          name: yup.string().required("Name is required"),
          price: yup.number().min(1, "Price must be greater than 0"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;

      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "Product",
          message: error,
        });
      });
    }
  }
}
