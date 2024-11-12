import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class EventsService {
  private events = [];

  getAllEvents() {
    return this.events;
  }

  createEvent(event: any) {
    // const newEvent = { id: uuidv4(), ...event }
    // this.events.push(newEvent);
    // return event;

    console.log(event.date)
    
    const parsedDate = this.parseDate(event.date);
    if (!parsedDate) {
      throw new Error("Invalid date format");
    }

    const newEvent = {
      id: uuidv4(),
      ...event,
      date: parsedDate.toISOString(),
    };
    this.events.push(newEvent);
    return newEvent;
  }

  parseDate(dateString: string): Date | null {
    const timestamp = Date.parse(dateString);
    if (!isNaN(timestamp)) {
      return new Date(timestamp);
    }
    return null;
  }

  updateEvent(id: string, updatedEvent: any) {
    // const index = this.events.findIndex((event) => event.id === id);
    // if (index !== -1) {
    //   this.events[index] = { ...this.events[index], ...updatedEvent };
    //   return this.events[index];
    // }
    // return null;

    const index = this.events.findIndex((event) => event.id === id);
    if (index !== -1) {
      const parsedDate = updatedEvent.date ? this.parseDate(updatedEvent.date) : this.events[index].date;
      if (!parsedDate) {
        throw new Error("Invalid date format");
      }

      this.events[index] = {
        ...this.events[index],
        ...updatedEvent,
        date: parsedDate.toISOString(),
      };
      return this.events[index];
    }
    return null;
  }

  deleteEvent(id: string) {
    const index = this.events.findIndex((event) => event.id === id);
    if (index !== -1) {
      const deletedEvent = this.events.splice(index, 1);
      return deletedEvent[0];
    }
    return null;
  }
}
