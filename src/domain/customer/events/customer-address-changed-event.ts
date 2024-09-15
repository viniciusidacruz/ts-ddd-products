import { AddressEntity } from "../value-objects";
import { EventInterface } from "../../@shared/events/event.interface";

export class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: { id: string; name: string; address: AddressEntity };

  constructor(eventData: { id: string; name: string; address: AddressEntity }) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
