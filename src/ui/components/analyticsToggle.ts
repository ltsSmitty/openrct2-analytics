import { ActionTypes } from "openrct2-extended-hooks";
import { WidgetCreator, FlexiblePosition, checkbox } from "openrct2-flexui";
import { eventTextMap } from "../../eventTextMap";

export const analyticsToggle = (
  action: ActionTypes.ExtendedActionType
): WidgetCreator<FlexiblePosition> => {
  return checkbox({ text: eventTextMap[action] });
};
