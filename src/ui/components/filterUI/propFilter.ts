import { compute, dropdown, horizontal, label, spinner, toggle } from "openrct2-flexui";
import { model } from "../../tabs/analysisTab";

export const filterByProp = () => {
  return horizontal({
    content: [
      // checkbox
      label({
        text: "Select property to filter by",
      }),
      dropdown({
        items: compute(model.loadedEventProps, (props) => props),
      }),
    ],
  });
};
