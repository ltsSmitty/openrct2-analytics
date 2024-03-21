import { TrackEventType, analytics } from "openrct2-analytics-sdk";
import {
  ArrayStore,
  FlexiblePosition,
  Parsed,
  WidgetCreator,
  arrayStore,
  tab,
} from "openrct2-flexui";
import { eventView } from "../../components/eventView";

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

export const debuggerTab = () => {
  const eventViews: WidgetCreator<FlexiblePosition>[] = [];
  for (let i = 0; i < 10; i++) {
    eventViews.push(eventView(i));
  }

  return tab({
    onOpen: () => {
      analytics.flush();
    },
    image: {
      frameBase: 5367,
      frameCount: 8,
      frameDuration: 8,
    },
    content: [...eventViews],
  });
};
