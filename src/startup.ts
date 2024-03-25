import { analytics } from "openrct2-analytics-sdk";
import * as window from "./ui/window";
import { eventDebugger } from "./objects/debugger";

export function startup() {
  analytics.init({
    pluginName: "analytics-core",
    eventCallback: (data) => {
      console.log(`Tracking event: `, data.properties);
      eventDebugger.push(data);
    },
  });

  if (typeof ui !== "undefined") {
    window.initialize();

    const menuItemName = "OpenRCT2 Analytics Core";
    ui.registerMenuItem(menuItemName, window.openWindow);
  }
}
