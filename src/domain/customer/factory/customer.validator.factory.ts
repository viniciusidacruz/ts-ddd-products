import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { CustomerEntity } from "../entity/customer.entity";
import { CustomerYupValidator } from "../validator/customer.yup.validator";

export class CustomerValidatorFactory {
    static create(): ValidatorInterface<CustomerEntity> {
        return new CustomerYupValidator();
    }
}