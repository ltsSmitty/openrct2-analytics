import { compute, groupbox, horizontal, label } from "openrct2-flexui";
import { eventDebugger } from "../tabs/mainTab/debuggerTab";

export const eventView = (index: number) => {
  const visibility = compute(eventDebugger.store, (eventArray) => {
    if (eventArray[index] === undefined) {
      return "hidden";
    }
    return "visible";
  });

  return groupbox({
    visibility,
    content: [
      horizontal({
        content: [
          label({
            visibility,
            text: compute(eventDebugger.store, (eventArray) => {
              if (eventArray[index] === undefined) {
                return "No Event";
              }
              return eventArray[index]?.properties.name || "No Event";
            }),
          }),
          label({
            visibility,
            text: compute(eventDebugger.store, (eventArray) => {
              if (eventArray[index] === undefined) {
                return "";
              }
              const date = new Date(eventArray[index]?.timestamp || "");
              return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            }),
          }),
        ],
      }),
    ],
  });
};
