import { analyticsSubscriptionName } from "../config";
import { getMetadata } from "../metadata/metadata";

export type TrackEventType = ReturnType<typeof getMetadata> & {
  properties: TrackEventProps;
};

export type TrackEventProps = {
  name: string;
  [key: string]: any;
};

export default function track<T extends TrackEventProps>(
  props: string | T,
  printDebug = false
) {
  const metadata = getMetadata();
  const event = typeof props === "string" ? { name: props } : props;
  const eventData = {
    ...metadata,
    properties: event,
  };
  if (printDebug) {
    console.log(eventData);
  }

  if (!event.name) {
    console.log("Event name is required.");
    return;
  }

  context.executeAction(analyticsSubscriptionName, eventData, (result) => {
    if (result.error) {
      console.log(result.errorTitle, result.errorMessage);
    } else {
      console.log(
        `Action "${eventData.properties.name}" executed successfully.`
      );
    }
  });
}
