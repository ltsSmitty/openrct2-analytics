import * as flex from "openrct2-flexui";

const statIncreaseIcon: ImageAnimation = {
  frameBase: 5367,
  frameCount: 8,
  frameDuration: 8,
};

export const mainTabContent = () =>
  flex.tab({
    image: statIncreaseIcon,
    content: [
      flex.label({
        text: "Welcome to the OpenRCT2 Analytics Core",
      }),
      flex.label({
        text: "This is a work in progress",
      }),
      flex.label({
        text: "Please check back later",
      }),
    ],
  });
