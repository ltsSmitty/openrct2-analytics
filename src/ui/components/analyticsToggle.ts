import { ActionTypes } from "openrct2-extended-hooks";
import { WidgetCreator, FlexiblePosition, checkbox, compute } from "openrct2-flexui";
import { eventTextMap } from "../../eventTextMap";
import { subs } from "../../objects/subscriptions";

export const analyticsToggle = (
  action: ActionTypes.ExtendedActionType
): WidgetCreator<FlexiblePosition> => {
  return checkbox({
    text: eventTextMap[action],
    isChecked: compute(subs.subscriptions[action], (v) => v),
    onChange: (v) => {
      subs.subscriptions[action].set(v);
    },
  });
};
