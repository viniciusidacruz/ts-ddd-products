import * as yup from "yup";

import { CustomerEntity } from "../entity/customer.entity";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";

export class CustomerZodValidator
  implements ValidatorInterface<CustomerEntity>
{
  validate(entity: CustomerEntity): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required(),
          name: yup.string().required(),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;

      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "Customer",
          message: error,
        });
      });
    }
  }
}
