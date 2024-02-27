import track from "../track/track";

export const onParkChange = () => {
  context.subscribe("map.save", () => {
    track("Map saved");
  });

  context.subscribe("map.changed", () => {
    track("Map changed");
  });

  context.subscribe("map.change", () => {
    track("Map change");
  });
};
