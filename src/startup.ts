import { analytics } from "openrct2-analytics-sdk";
import * as window from "./ui/window";
import { onRideChange } from "./hooks/ride";

export function startup() {
  analytics.init({ pluginName: "analytics-core" });

  onRideChange("mazeplacetrack", cb);
  onRideChange("mazesettrack", cb);
  onRideChange("ridecreate", cb);
  onRideChange("ridedemolish", cb);
  onRideChange("stallcreate", cb);
  onRideChange("stalldemolish", cb);
  onRideChange("rideentranceexitplace", cb);
  onRideChange("rideentranceexitremove", cb);
  onRideChange("ridefreezerating", cb);
  // onRideChange("ride.ratings.calculate", cb);
  onRideChange("ridesetappearance", cb);
  onRideChange("ridesetcolourscheme", cb);
  onRideChange("ridesetname", cb);
  onRideChange("ridesetprice", cb);
  onRideChange("ridesetsetting", cb);
  onRideChange("ridesetstatus", cb);
  onRideChange("ridesetvehicle", cb);
  onRideChange("trackdesign", cb);
  // onRideChange("trackplace", cb);
  onRideChange("trackremove", cb);
  onRideChange("tracksetbrakespeed", cb);
  onRideChange("vehicle.crash", cb);

  if (typeof ui !== "undefined") {
    window.initialize();
    // todo init analytics hooks settings

    const menuItemName = "OpenRCT2 Analytics Core";
    ui.registerMenuItem(menuItemName, window.openWindow);
  }
}

const cb = (data: any) => {
  if (data.args.flags <= 0) {
    console.log(`in cb`, data);
  }
};
