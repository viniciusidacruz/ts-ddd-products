export type NotificationError = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationError[] = [];

  addError(error: NotificationError): void {
    this.errors.push(error);
  }

  messages(context?: string): string {
    // if (!context) {
    //   return this.errors.map((error) => error.message).join(", ");
    // }

    let messages = this.errors
      .filter((error) => error.context === context || !context)
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");

    return messages ? `${messages}.` : "";
  }
}
