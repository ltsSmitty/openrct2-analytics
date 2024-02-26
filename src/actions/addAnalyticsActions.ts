import { analyticsSubscriptionName } from "../config";
import { saveEventData } from "../io/saveData";
import { TrackEventType } from "../track/track";

export const addAnalyticsActions = () => {
  context.registerAction(
    analyticsSubscriptionName,
    (data) => {
      const trackData = data as TrackEventType;
      // todo check if analytics is enabled
      if (true) {
        return {
          args: trackData,
        } as GameActionResult;
      }
      return {
        error: 1,
        errorTitle: "Analytics Disabled",
        errorMessage: "Enable the Analytics plugin to use this feature.",
      } as GameActionResult;
    },
    (data) => {
      const trackData = data as TrackEventType;
      saveEventData(trackData);
      return { args: trackData } as GameActionResult;
    }
  );
};
