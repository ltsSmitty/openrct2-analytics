import { EntranceRemoveArgs } from "../hooks/scenarioEditing";
import { analytics } from "openrct2-analytics";

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

export const climateSetCallback = (args: ClimateSetArgs) => {
  analytics.track({
    name: "Climate set",
    properties: args,
  });
};

export const parkEntranceRemovedCallback = (args: EntranceRemoveArgs) => {
  analytics.track({
    name: "Park entrance removed",
    properties: args,
  });
};
