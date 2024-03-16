import { analytics } from "openrct2-analytics";
import hooks from "./hooks";

function onClickMenuItem() {
  // Write code here that should happen when the player clicks the menu item under the map icon.

  console.log(
    `Save file: ${scenario.filename}, Scenario name: ${scenario.name}, park name ${park.name}`
  );
}

export function startup() {
  // Register a menu item under the map icon:

  // analytics.init({ pluginName: "MyPlugin" });
  hooks.guest.onGuestGenerated(cb);
  // hooks.guest.onPeepPickup(cb);
  // hooks.guest.onStaffHire(cb);
  // hooks.guest.onStaffFire(cb);
  // hooks.guest.onStaffSetColour(cb);
  // hooks.guest.onStaffSetCostume(cb);
  // hooks.guest.onStaffSetName(cb);
  // hooks.guest.onStaffSetOrders(cb)
  // hooks.guest.onStaffSetPatrolArea(cb);
  // hooks.guest.onGuestSetName(cb);
  // hooks.guest.onGuestSetFlags(cb);?
  // hooks.scenarioEditing.onParkEntranceRemoved(cb);
  // hooks.scenery.onChangeScenery("clearscenery", cb);
  // hooks.scenery.onChangeScenery("landlower", cb);
  // hooks.scenery.onChangeScenery("landraise", cb);
  // hooks.scenery.onChangeScenery("landsetheight", cb);
  // hooks.scenery.onChangeScenery("landsetrights", cb);
  // hooks.scenery.onChangeScenery("landsmoothaction", cb);
  // hooks.scenery.onChangeScenery("largesceneryplace", cb);
  // hooks.scenery.onChangeScenery("largesceneryremove", cb);
  // hooks.scenery.onChangeScenery("smallsceneryplace", cb);
  // hooks.scenery.onChangeScenery("smallsceneryremove", cb);
  hooks.scenery.onChangeScenery("surfacesetstyle", cb);
  hooks.scenery.onChangeScenery("tilemodify", cb);
  hooks.scenery.onChangeScenery("wallplace", cb);
  hooks.scenery.onChangeScenery("wallremove", cb);
  hooks.scenery.onChangeScenery("wallsetcolour", cb);
  hooks.scenery.onChangeScenery("waterlower", (data) => {
    console.log(`water lower`, data);
  });
  hooks.scenery.onChangeScenery("waterraise", cb);
  hooks.scenery.onChangeScenery("watersetheight", cb);

  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Analytics", () => onClickMenuItem());
  }
}

const cb = (data: any) => {
  console.log(data);
};
