import { analytics } from "openrct2-analytics-sdk";
import {
  FlexiblePosition,
  WidgetCreator,
  compute,
  groupbox,
  horizontal,
  label,
  tab,
  vertical,
} from "openrct2-flexui";
import { eventView } from "../components/eventView";
import { eventDebugger } from "../../objects/debugger";

const visibility = compute(eventDebugger.store, (eventArray) => {
  return eventArray.length === 0 ? "visible" : "hidden";
});

export const debuggerTab = () => {
  const eventViews: WidgetCreator<FlexiblePosition>[] = [];
  for (let i = 0; i < 10; i++) {
    eventViews.push(eventView(i));
  }

  const noRecentEvents: WidgetCreator<FlexiblePosition> = horizontal({
    content: [
      vertical({
        content: [
          label({
            visibility,
            padding: [0, 0, 0, 100],
            text: "No recent events",
          }),
          label({
            visibility,
            text: "Enable event tracking and perform actions in the game to see events here.",
          }),
        ],
      }),
    ],
  });

  return tab({
    width: 400,
    onOpen: () => {
      analytics.flush();
      analytics.setFlushThreshold(1);
      console.log(eventDebugger.store.get());
    },
    onClose: () => {
      // todo set it back to the default, not a magic 25
      analytics.setFlushThreshold(100);
    },
    image: {
      frameBase: 5530,
      frameCount: 7,
      frameDuration: 8,
    },
    content: [
      groupbox({
        text: "Event Debugger",
        content: [
          // noRecentEvents,
          ...eventViews,
        ],
      }),
    ],
  });
};
