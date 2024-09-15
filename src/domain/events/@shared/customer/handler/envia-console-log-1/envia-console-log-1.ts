import { EventHandlerInterface } from "../../../event-handler.interface";
import { CustomerCreatedEvent } from "../../customer-created.event";

export class EnviaConsoleLog1Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handler(event: CustomerCreatedEvent): void {
    console.log(
      `Esse é o primeiro console.log do evento: ${event.eventData.eventName}`
    );
  }
}
