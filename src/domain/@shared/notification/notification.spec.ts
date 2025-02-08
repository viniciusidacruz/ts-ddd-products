import { Notification } from "./notification";

describe("Unit test for Notifications", () => {
  it("Should create an errors", () => {
    const notification = new Notification();

    const errorOne = {
      message: "Error message",
      context: "customer",
    };

    notification.addError(errorOne);

    expect(notification.messages("customer")).toBe("customer: Error message.");

    const errorTwo = {
      message: "Error message 2",
      context: "customer",
    };

    notification.addError(errorTwo);

    expect(notification.messages("customer")).toBe(
      "customer: Error message, customer: Error message 2."
    );

    const errorThree = {
      message: "Error message",
      context: "order",
    };

    notification.addError(errorThree);

    expect(notification.messages("order")).toBe("order: Error message.");
    expect(notification.messages()).toBe(
      "customer: Error message, customer: Error message 2, order: Error message."
    );
  });

  it("Should check if notification has at least one error", () => {
    const notification = new Notification();

    const errorOne = {
      message: "Error message",
      context: "customer",
    };

    notification.addError(errorOne);

    expect(notification.hasErrors()).toBeTruthy();
  });

  it("Should get all errors props", () => {
    const notification = new Notification();

    const errorOne = {
      message: "Error message",
      context: "customer",
    };

    notification.addError(errorOne);

    expect(notification.getErrors()).toEqual([errorOne]);
  });
});
