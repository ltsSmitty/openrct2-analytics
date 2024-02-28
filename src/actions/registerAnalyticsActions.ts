import { analyticsSubscriptionName } from "../config";
import { saveEventData } from "../io/saveData";
import { TrackEventType } from "../objects/analytics";

export const registerAnalyticsActions = () => {
  console.log("Registering analytics actions", analyticsSubscriptionName);
  context.registerAction(
    analyticsSubscriptionName,
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
      const trackData = data as { args: TrackEventType[] };
      saveEventData(trackData.args);
      return {} as GameActionResult;
    }
  );
};
