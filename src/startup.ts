import { analytics } from "openrct2-analytics-sdk";
import hooks from "./hooks";
import * as window from "./ui/window";

export function startup() {
  analytics.init({ pluginName: "analytics-core" });

  hooks.scenery.onChangeScenery("footpathadditionplace", cb);
  hooks.scenery.onChangeScenery("footpathadditionremove", cb);
  hooks.scenery.onChangeScenery("footpathplace", cb);
  hooks.scenery.onChangeScenery("footpathremove", cb);
  hooks.scenery.onChangeScenery("footpathlayoutplace", cb);

  if (typeof ui !== "undefined") {
    window.initialize();
    // todo init analytics hooks settings

    const menuItemName = "OpenRCT2 Analytics Core";
    ui.registerMenuItem(menuItemName, window.openWindow);
  }
}

const cb = (data: any) => {
  console.log(`in cb`, data.action);
};
