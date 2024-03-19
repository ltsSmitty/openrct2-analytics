import { analytics } from "openrct2-analytics-sdk";
import * as window from "./ui/window";
import hooks from "./hooks";

export function startup() {
  analytics.init({ pluginName: "analytics-core" });

  context.subscribe("action.execute", (data) => {
    // if (data.action === "tilemodify") {
    console.log(`in tilemodify`, data);
  });

  if (typeof ui !== "undefined") {
    window.initialize();

    const menuItemName = "OpenRCT2 Analytics Core";
    ui.registerMenuItem(menuItemName, window.openWindow);
  }
}

const cb = (data: any) => {
  console.log(`in cb`, data);
};
