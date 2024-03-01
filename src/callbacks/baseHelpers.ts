import { analytics } from "../objects/analytics";

const titleScreenMapChangedCallback = () => {
  analytics.track("Title screen map changed");
};

const scenarioEditorMapChangedCallback = () => {
  analytics.track("Scenario editor map changed");
};

const trackDesignerMapChangedCallback = () => {
  analytics.track("Track designer map changed");
};

const trackManagerMapChangedCallback = () => {
  analytics.track("Track manager map changed");
};
