import { TrackEventType } from "openrct2-analytics-sdk";
import { ArrayStore, arrayStore } from "openrct2-flexui";

class Debugger {
  store: ArrayStore<TrackEventType | undefined> = arrayStore<TrackEventType | undefined>([]);
  push(data: any) {
    this.store.splice(0, 0, data);
    if (this.store.get().length > 10) {
      this.store.pop();
    }
  }
}

export const eventDebugger = new Debugger();
