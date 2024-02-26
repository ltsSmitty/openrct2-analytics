import { analyticsSubscriptionName } from "../config";
import { getMetadata } from "../metadata/metadata";

export type TrackEventType = ReturnType<typeof getMetadata> & {
  properties: TrackEventProps;
};

export type TrackEventProps = {
  name: string;
  [key: string]: any;
};

export default function track<T extends TrackEventProps>(props: string | T) {
  const metadata = getMetadata();
  const event = typeof props === "string" ? { name: props } : props;
  const eventData = {
    ...metadata,
    properties: event,
  };

  context.executeAction(analyticsSubscriptionName, eventData, (result) => {
    if (result.error) {
      console.log(result.errorTitle, result.errorMessage);
    }
  });
}
