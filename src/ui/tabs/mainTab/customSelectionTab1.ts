import { actions } from "openrct2-extended-hooks";
import { tab, groupbox, horizontal, vertical } from "openrct2-flexui";
import { analyticsToggle } from "../../components/analyticsToggle";
import { checkboxes } from "../../components/checkboxes";

const gearIcon: ImageAnimation = {
  frameBase: 5205,
  frameCount: 16,
  frameDuration: 8,
};

export const customSelectionTab1 = () => {
  return tab({
    width: 360,
    image: gearIcon,
    content: [
      groupbox({
        text: "Select events to track, part 1",
        content: [
          horizontal({
            content: [
              vertical({
                content: [
                  groupbox({
                    text: "Landscaping",
                    content: [
                      vertical({
                        content: checkboxes.landscaping,
                      }),
                    ],
                  }),
                  groupbox({
                    text: "Park",
                    content: [
                      vertical({
                        content: checkboxes.park,
                      }),
                    ],
                  }),
                ],
              }),
              groupbox({
                text: "Ride",
                content: [
                  vertical({
                    content: checkboxes.ride,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
