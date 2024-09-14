import { EventInterface } from "../event.interface";
import { EventHandlerInterface } from "../event-handler.interface";
import { EventDispatcherInterface } from "./event-dispatcher.interface";

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((handler) => {
        handler.handler(event);
      });
    }
  }
  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    const eventHandlers = this.eventHandlers[eventName];

    if (eventHandlers) {
      this.eventHandlers[eventName] = eventHandlers.filter(
        (handler) => handler !== eventHandler
      );
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
