import { analytics } from "../objects/analytics";

export const titleScreenMapChangedCallback = () => {
  analytics.track("Title screen map changed");
};

export const scenarioEditorMapChangedCallback = () => {
  analytics.track("Scenario editor map changed");
};

export const trackDesignerMapChangedCallback = () => {
  analytics.track("Track designer map changed");
};

export const trackManagerMapChangedCallback = () => {
  analytics.track("Track manager map changed");
};

export const mapSizeChangeCallback = () => {
  analytics.track("Map size changed");
};

export const climateSetCallback = (args: hooks.ClimateSetArgs) => {
  analytics.track({
    name: "Climate set",
    properties: args,
  });
};

export const parkEntranceRemovedCallback = (args: hooks.EntranceRemoveArgs) => {
  analytics.track({
    name: "Park entrance removed",
    properties: args,
  });
};
