import { CustomerCreatedEvent } from "../../customer-created.event";
import { EventDispatcher } from "../../../../@shared/events/event-dispatcher/event-dispatcher";

import { EnviaConsoleLog1Handler } from "./envia-console-log-1";

describe("Envia console log 1", () => {
  it("Should be return console log 1", () => {
    const eventDispatcher = new EventDispatcher();
    const sendConsoleLog1Handler = new EnviaConsoleLog1Handler();

    const spyEventHandler = jest.spyOn(sendConsoleLog1Handler, "handler");

    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(sendConsoleLog1Handler);

    const firstCustomerCreatedEvent = new CustomerCreatedEvent({
      eventName: "CustomerCreated",
    });
    eventDispatcher.notify(firstCustomerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});
