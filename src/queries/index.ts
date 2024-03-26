/** Potential query params:
 *  by event
 *  by time (date, hour, etc)
 *  by park
 *  by ride
 *  by peep
 *  by action group (landscape, rides, stalls, staff, etc)
 *  by action type (create, modify, delete, etc)
 *  by action property (name, price, colour, etc)
 */

import { EventName } from "../eventNames";
import { LoadedEventData } from "../objects/analysis";

export type QueryParam =
  | "byEventName"
  | "byDate"
  //   | "byPark"
  | "byRide";
//   | "byParkDate"
//   | "byCategory";

export class QueryObj {
  data: LoadedEventData = {};

  constructor(data: LoadedEventData) {
    this.data = data;
  }

  query = (qName: QueryParam) => {
    return (values: any) => this[qName](values);
  };

  private byEventName = (eventName: EventName) => {
    const data = { [eventName]: this.data[eventName] } as LoadedEventData;
    this.data = data;
    return data;
  };

  private byDate = (DMYString: string) => {
    const keys = Object.keys(this.data);
    const [day, month, year] = DMYString.split("/").map((v: string) => parseInt(v));
    const result: LoadedEventData = {};
    keys.forEach((key, i) => {
      const events = this.data[key as EventName];
      if (events) {
        const filtered = events.filter((e, j) => {
          const eventDate = new Date(e.timestamp);
          console.log(`${key} ${i} ${j}`);
          return (
            eventDate.getDate() === day &&
            eventDate.getMonth() === month &&
            eventDate.getFullYear() === year
          );
        });
        if (filtered.length > 0) {
          result[key as EventName] = filtered;
        }
      }
    });
    // i think this isn't being set to the right this
    this.data = result;
    return result;
  };

  private byRide = (rideID: string) => {
    const keys = Object.keys(this.data);
    const result: LoadedEventData = {};
    keys.forEach((key) => {
      const events = this.data[key as EventName];
      if (events) {
        const filtered = events.filter((e) => {
          // @ts-ignore
          const ride = e.properties.properties?.args?.ride;
          //   console.log(ride, rideID, ride === rideID);
          return ride && ride === rideID;
        });
        if (filtered.length > 0) {
          console.log(`rideId: ${rideID}`, filtered.length);
          result[key as EventName] = filtered;
        }
      }
    });
    this.data = result;
    return result;
  };
}
