interface Customer {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface InputListCustomerDTO {}

export interface OutputListCustomerDTO {
  customers: Customer[];
}
