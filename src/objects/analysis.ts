import { TrackEventType } from "openrct2-analytics-sdk";

type TrackWithArgs = TrackEventType & {
  properties: { properties: GameActionEventArgs<object> | undefined };
};

const dataKey = "analytics.data.storage";

export class Analysis {
  eventData: TrackWithArgs[] = [];

  loadFromStorage() {
    console.log(`started loading at ${new Date().toISOString()}`);
    const loadedData = context.sharedStorage.get(dataKey, []);
    console.log(`finished loading at ${new Date().toISOString()}`);
    const eventData: Record<string, TrackWithArgs[]> = {};
    Object.keys(loadedData).forEach((key) => {
      eventData[key] = loadedData[key as any];
    });
    Object.keys(eventData).forEach((key) => {
      console.log(`key: ${key}`, `${eventData[key].length} events`);
    });
  }
}

export const analysis = new Analysis();
