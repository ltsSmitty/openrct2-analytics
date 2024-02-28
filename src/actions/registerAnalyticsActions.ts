import { analyticsEventEnqueueKey, analyticsFlushAndSaveKey } from "../config";
import { saveEventData } from "../io/saveData";
import { TrackEventType, analytics } from "../objects/analytics";

export const registerEventEnqueueAction = () => {
  console.log(
    "Registering event enqueue action under the name",
    analyticsEventEnqueueKey
  );
  context.registerAction(
    analyticsEventEnqueueKey,
    (_data) => {
      // todo check if analytics is enabled
      if (true) {
        return {} as GameActionResult;
      }
      return {
        error: 1,
        errorTitle: "Analytics Disabled",
        errorMessage: "Enable the Analytics plugin to use this feature.",
      } as GameActionResult;
    },
    (data) => {
      const eventData = (data as { args: TrackEventType }).args;
      analytics.enqueEvent(eventData);
      return { data } as GameActionResult;
    }
  );
};

export const registerFlushAndSaveEventsAction = () => {
  console.log(
    "Registering event flushing/saving under the name",
    analyticsFlushAndSaveKey
  );
  context.registerAction(
    analyticsFlushAndSaveKey,
    (_data) => {
      // todo check if analytics is enabled
      if (true) {
        return {} as GameActionResult;
      }
      return {
        error: 1,
        errorTitle: "Analytics Disabled",
        errorMessage: "Enable the Analytics plugin to use this feature.",
      } as GameActionResult;
    },
    (data) => {
      const trackedEvents = (data as { args: TrackEventType[] }).args;
      saveEventData(trackedEvents);
      return { data } as GameActionResult;
    }
  );
};
