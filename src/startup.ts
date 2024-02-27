import { registerAnalyticsActions } from "./actions/registerAnalyticsActions";
import { analyticsSubscriptionName } from "./config";
import { onParkChange } from "./hooks/onParkChange";

function onClickMenuItem() {
  // Write code here that should happen when the player clicks the menu item under the map icon.

  console.log(
    `Save file: ${scenario.filename}, Scenario name: ${scenario.name}, park name ${park.name}`
  );
}

export function startup() {
  // Register a menu item under the map icon:
  registerAnalyticsActions();
  onParkChange();

  context.subscribe("action.execute", (data) => {
    if (data.action === analyticsSubscriptionName) {
      // console.log("Analytics data", data);
    }
  });

  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Analytics", () => onClickMenuItem());
  }
}
