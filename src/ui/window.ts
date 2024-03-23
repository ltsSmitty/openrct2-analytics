import * as flex from "openrct2-flexui";
import { mainTabContent } from "./tabs/mainTab";
import { debuggerTab } from "./tabs/debuggerTab";
import { customSelectionTab1 } from "./tabs/customSelectionTab1";
import { customSelectionTab2 } from "./tabs/customSelectionTab2";

let window: flex.WindowTemplate;
let isWindowOpen = false;

export function initialize() {
  window = flex.tabwindow({
    title: "OpenRCT2 Statistics",
    width: 300,
    height: "auto",
    colours: [flex.Colour.LightBlue, flex.Colour.LightBlue, flex.Colour.White],
    onOpen: () => (isWindowOpen = true),
    onClose: () => (isWindowOpen = false),
    tabs: [mainTabContent(), debuggerTab(), customSelectionTab1(), customSelectionTab2()],
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
