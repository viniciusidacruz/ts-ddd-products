import { AddressEntity } from "../../../entities";
import { EventInterface } from "../event.interface";

export class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: { id: string; name: string; address: AddressEntity };

  constructor(eventData: { id: string; name: string; address: AddressEntity }) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
