import { EventDispatcher } from "../../../event-dispatcher/event-dispatcher";
import { CustomerCreatedEvent } from "../../customer-created.event";
import { EnviaConsoleLog2Handler } from "./envia-console-log-2";

describe("Envia console log 2", () => {
  it("Should be return console log 2", () => {
    const eventDispatcher = new EventDispatcher();
    const sendConsoleLog1Handler = new EnviaConsoleLog2Handler();

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
