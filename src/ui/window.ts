import * as flex from "openrct2-flexui";
import { mainTabContent } from "./tabs/mainTab/mainTab";
import { debuggerTab } from "./tabs/mainTab/debugger";

let window: flex.WindowTemplate;
let isWindowOpen = false;

export function initialize() {
  window = flex.tabwindow({
    title: "OpenRCT2 Statistics",
    width: 250,
    height: "auto",
    position: "center",
    colours: [flex.Colour.LightBlue, flex.Colour.LightBlue, flex.Colour.White],
    onOpen: () => (isWindowOpen = true),
    onClose: () => (isWindowOpen = false),
    tabs: [mainTabContent(), debuggerTab()],
  });
}

/**
 * Opens the main window. If already open, the window will be focused.
 */
export function openWindow() {
  if (isWindowOpen) {
    window.focus();
  } else {
    window.open();
  }
}
