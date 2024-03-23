import { tab, groupbox, horizontal, vertical } from "openrct2-flexui";
import { checkboxes } from "../components/checkboxes";

const gearIcon: ImageAnimation = {
  frameBase: 5205,
  frameCount: 16,
  frameDuration: 8,
};

export const customSelectionTab1 = () => {
  return tab({
    width: 600,
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
              vertical({
                content: [
                  groupbox({
                    text: "Scenery",
                    content: [
                      vertical({
                        content: checkboxes.scenery,
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
