import { registerAnalyticsActions } from "../actions/registerAnalyticsActions";
import { onParkChange } from "../hooks/onParkChange";
import { saveEventData } from "../io/saveData";
import { getMetadata } from "../metadata/metadata";

export type TrackEventType = ReturnType<typeof getMetadata> & {
  properties: TrackEventProps;
};

export type TrackEventProps = {
  name: string;
  [key: string]: any;
};

type AnalyticsParams = {
  /** The number of events to queue before flushing. Set to 1 to flush after every event.
   * May impact performance if set too low.
   */
  flushThreshold: number;
};

export const eventQueue: TrackEventType[] = [];

class Analytics {
  // todo future optimization, preallocate array size and reset function to save garagbe collection
  eventQueue: TrackEventType[] = [];
  flushThreshold: number = 25;

  constructor(params?: AnalyticsParams) {
    if (params) {
      if (params.flushThreshold < 1) {
        throw new Error("Flush threshold must be greater than 0");
      }
      this.flushThreshold = Math.ceil(Math.min(params.flushThreshold, 1000));
    }
  }

  track<T extends TrackEventProps>(props: string | T, printDebug = false) {
    const metadata = getMetadata();
    const event = typeof props === "string" ? { name: props } : props;
    const eventData = {
      ...metadata,
      properties: event,
    };
    if (printDebug) {
      console.log(eventData);
    }
    this.enqueEvent(eventData);
  }

  flush() {
    console.log("Flushing events", this.eventQueue.length);
    saveEventData(this.eventQueue);
    this.eventQueue = [];
  }

  private enqueEvent(event: TrackEventType) {
    console.log(
      "Enqueing event",
      event.properties.name,
      this.eventQueue.length
    );
    this.eventQueue.push(event);
    if (this.eventQueue.length >= this.flushThreshold) {
      console.log(
        `Queue length ${this.eventQueue.length} exceeds threshold ${this.flushThreshold}, flushing`
      );
      this.flush();
    }
  }

  init() {
    registerAnalyticsActions();
    onParkChange();
  }
}

export const analytics = new Analytics({ flushThreshold: 100 });
