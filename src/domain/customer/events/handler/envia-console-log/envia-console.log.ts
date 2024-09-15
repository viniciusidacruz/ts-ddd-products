import { CustomerAddressChangedEvent } from "../../customer-address-changed-event";
import { EventHandlerInterface } from "../../../../@shared/events/event-handler.interface";

export class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handler(event: CustomerAddressChangedEvent): void {
    const { id, name, address } = event.eventData;
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${address.toString()}`
    );
  }
}
