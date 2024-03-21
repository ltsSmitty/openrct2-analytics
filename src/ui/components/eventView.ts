import { compute, horizontal, label } from "openrct2-flexui";
import { eventDebugger } from "../tabs/mainTab/debugger";

export const eventView = (index: number) => {
  return horizontal({
    content: [
      label({
        text: compute(eventDebugger.store, (eventArray) => {
          if (eventArray[index] === undefined) {
            return "No Event";
          }
          return eventArray[index]?.properties.name || "No Event";
        }),
      }),
    ],
  });
};
