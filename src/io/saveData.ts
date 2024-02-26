import { dataKey } from "../config";
import { TrackEventType } from "../track/track";

type savedDataShape = {
  [eventName: string]: TrackEventType[];
};

export const saveEventData = (data: TrackEventType | TrackEventType[]) => {
  const oldData = context.sharedStorage.get(dataKey, {}) as savedDataShape;

  if (Array.isArray(data)) {
    data.forEach((d) => {
      if (oldData[d.properties.name]) {
        oldData[d.properties.name].push(d);
      } else {
        oldData[d.properties.name] = [d];
      }
    });
  } else {
    if (oldData[data.properties.name]) {
      oldData[data.properties.name].push(data);
    } else {
      oldData[data.properties.name] = [data];
    }
  }
  context.sharedStorage.set(dataKey, oldData);
};
