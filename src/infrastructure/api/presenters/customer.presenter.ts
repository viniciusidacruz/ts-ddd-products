import { toXML } from "jstoxml";
import { OutputListCustomerDTO } from "../../../usecase/customer/list/list.customer.dto";

export class CustomerPresenter {
  static listXML(data: OutputListCustomerDTO): string {
    const xmlOptions = {
      header: true,
      indent: " ",
      newLine: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              city: customer.address.city,
              state: customer.address.state,
              zipCode: customer.address.zipCode,
            },
          })),
        },
      },
      xmlOptions
    );
  }
}
