import { compute, horizontal, label, spinner, toggle } from "openrct2-flexui";
import { model } from "../../tabs/analysisTab";

export const filterByDay = () => {
  return horizontal({
    content: [
      // checkbox
      toggle({
        height: 20,
        width: 20,
        isPressed: compute(model.toggles.byDate, (isPressed) => isPressed),
        onChange: (isPressed) => model.toggles.byDate.set(isPressed),
      }),
      label({
        text: "Filter by Date",
      }),
      spinner({
        value: compute(model.date.day, (day) => day),
        minimum: 1,
        maximum: 31,
        onChange: (value) => model.date.day.set(value),
      }),
      label({ text: "Day" }),
      spinner({
        value: compute(model.date.month, (month) => month),
        minimum: 1,
        maximum: 12,
        onChange: (value) => model.date.month.set(value),
      }),
      label({ text: "Month" }),
      spinner({
        value: compute(model.date.year, (year) => year),
        minimum: 2024,
        onChange: (value) => model.date.year.set(value),
      }),
      label({ text: "Year" }),
    ],
  });
};
