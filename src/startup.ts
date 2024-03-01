import { analytics } from "./objects/analytics";
import hooks from "./hooks";

function onClickMenuItem() {
  // Write code here that should happen when the player clicks the menu item under the map icon.

  console.log(
    `Save file: ${scenario.filename}, Scenario name: ${scenario.name}, park name ${park.name}`
  );
}

export function startup() {
  // Register a menu item under the map icon:

  analytics.init();
  // hooks.guest.onGuestGenerated(cb);
  // hooks.guest.onPeepPickup(cb);
  // hooks.guest.onStaffHire(cb);
  // hooks.guest.onStaffFire(cb);
  // hooks.guest.onStaffSetColour(cb);
  // hooks.guest.onStaffSetCostume(cb);
  // hooks.guest.onStaffSetName(cb);
  // hooks.guest.onStaffSetOrders(cb)
  // hooks.guest.onStaffSetPatrolArea(cb);
  // hooks.guest.onGuestSetName(cb);
  // hooks.guest.onGuestSetFlags(cb);
  hooks.scenarioEditing.onParkEntranceRemoved(cb);

  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Analytics", () => onClickMenuItem());
  }
}

const cb = (data: any) => {
  console.log(data);
};
