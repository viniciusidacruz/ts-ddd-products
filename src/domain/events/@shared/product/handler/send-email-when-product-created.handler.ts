import { EventHandlerInterface } from "../../event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreated
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handler(event: ProductCreatedEvent): void {
    console.log(`Sending email to...`);
  }
}
