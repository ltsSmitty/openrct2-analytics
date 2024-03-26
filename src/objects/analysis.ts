import { QueryObj } from "./../queries/index";
import { TrackEventType } from "openrct2-analytics-sdk";
import { EventName } from "../eventNames";
import { config } from "../config";

type TrackWithArgs = TrackEventType & {
  properties: { properties: GameActionEventArgs<object> | undefined };
};

export type LoadedEventData = Partial<Record<EventName, TrackWithArgs[]>>;

export class Analysis {
  eventData: LoadedEventData = {};
  queriedData: LoadedEventData = {};
  private queryObj = new QueryObj(this.eventData);
  query = this.queryObj.query;

  loadFromStorage() {
    const loadedData = context.sharedStorage.get(config.dataKey, []) as Partial<
      Record<EventName, TrackWithArgs[]>
    >;
    Object.keys(loadedData).forEach((k) => {
      const key = k as EventName;
      this.eventData[key] = loadedData[key];
    });
    Object.keys(this.eventData).forEach((k) => {
      const key = k as EventName;
      console.log(`key: ${key}`, `${this.eventData[key]?.length} events`);
    });

    this.queryObj = new QueryObj(this.eventData);
  }
}

export const analysis = new Analysis();
