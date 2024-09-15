import { CustomerCreatedEvent } from "../../customer-created.event";
import { EventHandlerInterface } from "../../../../@shared/events/event-handler.interface";

export class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handler(event: CustomerCreatedEvent): void {
    console.log(
      `Esse é o ${event.eventData.title} console.log do evento: ${event.eventData.eventName}`
    );
  }
}
