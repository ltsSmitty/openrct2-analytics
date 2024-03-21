import { dropdown, groupbox, label, tab, vertical } from "openrct2-flexui";

const statIncreaseIcon: ImageAnimation = {
  frameBase: 5367,
  frameCount: 8,
  frameDuration: 8,
};

export const mainTabContent = () => {
  return tab({
    image: statIncreaseIcon,
    content: [
      groupbox({
        text: "Analytics",
        content: [
          vertical({
            content: [
              label({ text: "Start with a tracking preset or customize your own" }),
              dropdown({
                items: ["None", "Standard", "Custom"],
                onChange: (value) => park.postMessage("Analytics preset changed."),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
