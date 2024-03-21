import { ActionTypes } from "openrct2-extended-hooks";
import { WidgetCreator, FlexiblePosition, checkbox, compute } from "openrct2-flexui";
import { eventTextMap } from "../../eventTextMap";
import { subscriptions } from "../../objects/subscriptions";

export const analyticsToggle = (
  action: ActionTypes.ExtendedActionType
): WidgetCreator<FlexiblePosition> => {
  return checkbox({
    text: eventTextMap[action],
    isChecked: compute(subscriptions[action], (v) => v),
    onChange: (v) => {
      subscriptions[action].set(v);
    },
  });
};
