import { tab, groupbox, horizontal, vertical } from "openrct2-flexui";
import { checkboxes } from "../components/checkboxes";

const gearIcon: ImageAnimation = {
  frameBase: 5205,
  frameCount: 16,
  frameDuration: 8,
};

export const customSelectionTab2 = () => {
  return tab({
    width: 600,
    image: gearIcon,
    content: [
      groupbox({
        text: "Select events to track, part 2",
        content: [
          horizontal({
            content: [
              vertical({
                content: [
                  groupbox({
                    text: "Guest/Peep",
                    content: [
                      vertical({
                        content: checkboxes.guest,
                      }),
                    ],
                  }),
                  groupbox({
                    text: "Staff",
                    content: [
                      vertical({
                        content: checkboxes.staff,
                      }),
                    ],
                  }),
                ],
              }),
              vertical({
                content: [
                  groupbox({
                    text: "Network",
                    content: [
                      vertical({
                        content: checkboxes.network,
                      }),
                    ],
                  }),
                  groupbox({
                    text: "Park Change",
                    content: [
                      vertical({
                        content: checkboxes.parkChange,
                      }),
                    ],
                  }),
                  groupbox({
                    text: "Other",
                    content: [
                      vertical({
                        content: checkboxes.other,
                      }),
                    ],
                  }),
                ],
              }),
              vertical({
                content: [
                  groupbox({
                    text: "Scenario Editing",
                    content: [
                      vertical({
                        content: checkboxes.scenarioEditing,
                      }),
                    ],
                  }),
                  groupbox({
                    text: "Park Change",
                    content: [
                      vertical({
                        content: checkboxes.parkChange,
                      }),
                    ],
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
