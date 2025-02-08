export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps): void {
    this.errors.push(error);
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  messages(context?: string): string {
    let messages = this.errors
      .filter((error) => error.context === context || !context)
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");

    return messages ? `${messages}.` : "";
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
