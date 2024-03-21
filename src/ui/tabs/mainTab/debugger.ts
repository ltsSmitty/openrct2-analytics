import { TrackEventType, analytics } from "openrct2-analytics-sdk";
import { ArrayStore, FlexiblePosition, WidgetCreator, arrayStore, tab } from "openrct2-flexui";
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
    width: 300,
    onOpen: () => {
      analytics.flush();
      analytics.setFlushThreshold(1);
    },
    onClose: () => {
      // todo set it back to the default, not a magic 25
      analytics.setFlushThreshold(25);
    },
    image: {
      frameBase: 5530,
      frameCount: 7,
      frameDuration: 8,
    },
    content: [...eventViews],
  });
};
