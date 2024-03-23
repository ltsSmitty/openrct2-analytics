import { analytics } from "openrct2-analytics-sdk";
import { button, compute, groupbox, horizontal, tab } from "openrct2-flexui";
import { eventDebugger } from "../../objects/debugger";
import { analysis } from "../../objects/analysis";

const visibility = compute(eventDebugger.store, (eventArray) => {
  return eventArray.length === 0 ? "visible" : "hidden";
});

export const analysisTab = () => {
  return tab({
    width: 400,
    height: 400,
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
                },
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
