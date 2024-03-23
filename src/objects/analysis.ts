import { TrackEventType } from "openrct2-analytics-sdk";

type TrackWithArgs = TrackEventType & {
  properties: { properties: GameActionEventArgs<object> | undefined };
};

const dataKey = "analytics.data.storage";

export class Analysis {
  eventData: TrackWithArgs[] = [];

  loadFromStorage() {
    console.log(`started loading at ${new Date().toISOString()}`);
    this.eventData = context.sharedStorage.get(dataKey, []) as TrackWithArgs[];
    console.log(`finished loading at ${new Date().toISOString()}`);
  }
}

export const analysis = new Analysis();
