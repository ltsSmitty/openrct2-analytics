import { getMetadata } from "../metadata/metadata";
import * as hooks from "../hooks/parkChange";
import {
  mapSavedCallback,
  titleScreenMapChangedCallback,
  inGameMapChangeCallback,
  scenarioEditorMapChangedCallback,
  trackDesignerMapChangedCallback,
  trackManagerMapChangedCallback,
  loadOrQuitCallback,
} from "../callbacks/baseHelpers";
import {
  registerEventEnqueueAction,
  registerFlushAndSaveEventsAction,
} from "../actions/registerAnalyticsActions";
import { analyticsEventEnqueueKey, analyticsFlushAndSaveKey } from "../config";

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

const MAX_QUEUE_LENGTH = 1000;

class Analytics {
  // todo future optimization, preallocate array size and reset function to save garagbe collection
  eventQueue: TrackEventType[] = [];
  flushThreshold: number = 25;

  constructor(params?: AnalyticsParams) {
    if (params) {
      if (params.flushThreshold < 1) {
        throw new Error("Flush threshold must be greater than 0");
      }
      this.flushThreshold = Math.ceil(
        Math.min(params.flushThreshold, MAX_QUEUE_LENGTH)
      );
    }
  }

  track<T extends TrackEventProps>(props: string | T, printDebug = false) {
    const metadata = getMetadata();
    const event = typeof props === "string" ? { name: props } : props;
    const eventData = {
      ...metadata,
      properties: event,
    };
    // todo implement printDebug
    if (printDebug) {
      console.log(eventData);
    }
    // safely call the action to enqueue the event rather than calling it directly
    // this lets it be disabled or hooked into
    context.executeAction(analyticsEventEnqueueKey, eventData);
  }

  flush() {
    console.log("Flushing events", this.eventQueue.length);
    context.executeAction(
      analyticsFlushAndSaveKey,
      this.eventQueue,
      (result) => {
        if (result.error) {
          console.log(
            "Error flushing events",
            result.errorTitle,
            result.errorMessage
          );
        } else {
          console.log("Flushed events", this.eventQueue.length);
          this.eventQueue = [];
        }
      }
    );
  }

  /**
   * Not to be called directly, but through context.executeAction() for network safety
   * and hooking into.
   */
  enqueEvent(event: TrackEventType) {
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

  init(props?: { registerBaseEvents: boolean }) {
    registerEventEnqueueAction();
    registerFlushAndSaveEventsAction();

    // subscribe to some helpful events that many users will never want to do for themselves
    hooks.onMapSaved(mapSavedCallback);
    hooks.onTitleScreenMapChanged(titleScreenMapChangedCallback);
    hooks.onInGameMapChanged(inGameMapChangeCallback);
    hooks.onLoadOrQuit(loadOrQuitCallback);
  }
}

export const analytics = new Analytics({ flushThreshold: 100 });
