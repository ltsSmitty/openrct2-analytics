import { analytics } from "openrct2-analytics-sdk";
import { FlexiblePosition, WidgetCreator, tab } from "openrct2-flexui";
import { eventView } from "../../components/eventView";

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
