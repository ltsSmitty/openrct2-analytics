import { analytics } from "openrct2-analytics-sdk";
import { button, compute, groupbox, horizontal, label, store, tab } from "openrct2-flexui";
import { eventDebugger } from "../../objects/debugger";
import { analysis } from "../../objects/analysis";

const visibility = compute(eventDebugger.store, (eventArray) => {
  return eventArray.length === 0 ? "visible" : "hidden";
});

export const analysisTab = () => {
  const eventCount = store<number>(0);

  return tab({
    width: 400,
    height: 300,
    image: {
      frameBase: 5530,
      frameCount: 7,
      frameDuration: 8,
    },
    content: [
      groupbox({
        text: "Analysis",
        content: [
          horizontal({
            content: [
              button({
                text: "Fetch",
                onClick: () => {
                  analytics.flush();
                  analysis.loadFromStorage();
                  eventCount.set(analysis.eventData.length);
                },
              }),
              label({
                text: compute(eventCount, (count) => `Events: ${count}`),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
