import { AddressEntity } from "../../../../../entities";
import { EventDispatcher } from "../../../event-dispatcher/event-dispatcher";
import { CustomerAddressChangedEvent } from "../../customer-address-changed-event";
import { EnviaConsoleLogHandler } from "./envia-console.log";

describe("Envia console log", () => {
  it("Should send event when customer address is updated", () => {
    const eventDispatcher = new EventDispatcher();
    const sendConsoleLogHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(sendConsoleLogHandler, "handler");

    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      sendConsoleLogHandler
    );
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "1",
      name: "John Doe",
      address: new AddressEntity(
        "Av. Papa João XXIII, 695",
        "Ribeirão Pires",
        "São Paulo",
        "09421-540"
      ),
    });

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
