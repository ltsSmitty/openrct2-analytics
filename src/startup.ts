import { analytics } from "openrct2-analytics-sdk";
import * as window from "./ui/window";
import { hooks } from "openrct2-extended-hooks";
import { eventDebugger } from "./ui/tabs/mainTab/debugger";

export function startup() {
  analytics.init({
    pluginName: "analytics-core",
    eventCallback: (data) => {
      console.log(`in eventCallback`, data.properties.name);
      eventDebugger.push(data);
    },
  });

  if (typeof ui !== "undefined") {
    window.initialize();
    hooks.ride("ridesetname", cb);
    // todo init analytics hooks settings

    const menuItemName = "OpenRCT2 Analytics Core";
    ui.registerMenuItem(menuItemName, window.openWindow);
  }
}

const cb = (data: any) => {
  console.log(`in cb`, data);
};
