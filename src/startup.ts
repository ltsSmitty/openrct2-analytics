import { analytics } from "openrct2-analytics-sdk";
import * as window from "./ui/window";

export function startup() {
  analytics.init({ pluginName: "analytics-core" });

  if (typeof ui !== "undefined") {
    window.initialize();
    // todo init analytics hooks settings

    const menuItemName = "OpenRCT2 Analytics Core";
    ui.registerMenuItem(menuItemName, window.openWindow);
  }
}

const cb = (data: any) => {
  console.log(`in cb`, data.action, data);
};
