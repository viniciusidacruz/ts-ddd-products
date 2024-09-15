import { ProductCreatedEvent } from "../product-created.event";
import { EventHandlerInterface } from "../../../@shared/events/event-handler.interface";

export class SendEmailWhenProductIsCreated
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handler(event: ProductCreatedEvent): void {
    console.log(`Sending email to...`);
  }
}
