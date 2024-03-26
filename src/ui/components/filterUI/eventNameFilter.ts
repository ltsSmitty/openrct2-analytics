import { compute, dropdown, horizontal, label, toggle } from "openrct2-flexui";
import { model } from "../../tabs/analysisTab";

export const filterByEvent = () => {
  return horizontal({
    content: [
      // checkbox
      toggle({
        height: 20,
        width: 20,
        isPressed: compute(model.toggles.byEventName, (isPressed) => isPressed),
        onChange: (isPressed) => model.toggles.byEventName.set(isPressed),
      }),
      label({
        text: "Event Name",
      }),
      // dropdown
      dropdown({
        onChange: (index) => model.selectedEventIndex.set(index),
        items: compute(model.loadedEventNames, (names) => names.map((name) => name)),
        selectedIndex: compute(model.selectedEventIndex, (index) => index),
      }),
    ],
  });
};
