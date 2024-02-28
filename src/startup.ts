import { analytics } from "./objects/analytics";

function onClickMenuItem() {
  // Write code here that should happen when the player clicks the menu item under the map icon.

  console.log(
    `Save file: ${scenario.filename}, Scenario name: ${scenario.name}, park name ${park.name}`
  );
}

export function startup() {
  // Register a menu item under the map icon:

  analytics.init();

  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Analytics", () => onClickMenuItem());
  }
}
