import { EventDispatcher } from "../../../event-dispatcher/event-dispatcher";
import { CustomerCreatedEvent } from "../../customer-created.event";
import { EnviaConsoleLogHandler } from "./send-console-log.handler";

describe("Send console log", () => {
  it("Should be return console log first", () => {
    const eventDispatcher = new EventDispatcher();
    const sendConsoleLogHandler = new EnviaConsoleLogHandler();

    const spyEventHandler = jest.spyOn(sendConsoleLogHandler, "handler");

    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLogHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(sendConsoleLogHandler);

    const firstCustomerCreatedEvent = new CustomerCreatedEvent({
      title: "primeiro",
      eventName: "CustomerCreated",
    });
    eventDispatcher.notify(firstCustomerCreatedEvent);

    const secondCustomerCreatedEvent = new CustomerCreatedEvent({
      title: "segundo",
      eventName: "CustomerCreated",
    });
    eventDispatcher.notify(secondCustomerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalledTimes(2);
  });
});
