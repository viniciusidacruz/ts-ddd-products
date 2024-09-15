import { EventHandlerInterface } from "../../../event-handler.interface";
import { CustomerCreatedEvent } from "../../customer-created.event";

export class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handler(event: CustomerCreatedEvent): void {
    console.log(
      `Esse é o ${event.eventData.title} console.log do evento: ${event.eventData.eventName}`
    );
  }
}
