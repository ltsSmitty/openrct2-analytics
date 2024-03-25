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
      frameBase: 5245,
      frameCount: 8,
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
                  const rides = analysis.query("byEventName")("Ride created");
                  // const ridesByDay = analysis.query("byDate")("23/2/2024");
                  // console.log(`rides by day`, ridesByDay);
                  const ridesByRide = analysis.query("byRide")("1");
                  console.log(`rides by ride`, ridesByRide);

                  eventCount.set(analysis.eventData["Ride created"]?.length ?? 0);
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
