import { analytics } from "openrct2-analytics-sdk";
import hooks from "./hooks";

function onClickMenuItem() {
  // Write code here that should happen when the player clicks the menu item under the map icon.

  console.log(
    `NEW Save file: ${scenario.filename}, Scenario name: ${scenario.name}, park name ${park.name}`
  );
}

export function startup() {
  // Register a menu item under the map icon:

  analytics.init({ pluginName: "analytics-core" });
  // hooks.scenarioEditing.onScenarioEdit("changemapsize", cb);
  // hooks.scenery.onChangeScenery("surfacesetstyle", cb);

  context.subscribe("action.execute", (data) => {
    // if (data.action === "tilemodify") {
    console.log(`in tilemodify`, data);
  });

  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Analytics", () => onClickMenuItem());
  }
}

const cb = (data: any) => {
  console.log(`in cb`, data);
};
