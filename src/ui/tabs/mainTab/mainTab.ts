import { actions } from "openrct2-extended-hooks";
import { analyticsToggle } from "../../components/analyticsToggle";
import { tab } from "openrct2-flexui";

const statIncreaseIcon: ImageAnimation = {
  frameBase: 5367,
  frameCount: 8,
  frameDuration: 8,
};

export const mainTabContent = () => {
  const checkboxes = actions.hookActions.map((action) => {
    return analyticsToggle(action);
  });

  return tab({
    image: statIncreaseIcon,
    content: [...checkboxes],
  });
};
