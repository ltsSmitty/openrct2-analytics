import { analytics } from "../objects/analytics";

const mapSavedCallback = () => {
  analytics.track("Map saved");
};

const inGameMapChangeCallback = () => {
  analytics.track("Map changed");
};

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

const loadOrQuitCallback = (_result: GameActionEventArgs) => {
  analytics.track("Load or quit");
  analytics.flush();
};

export {
  mapSavedCallback,
  inGameMapChangeCallback,
  titleScreenMapChangedCallback,
  scenarioEditorMapChangedCallback,
  trackDesignerMapChangedCallback,
  trackManagerMapChangedCallback,
  loadOrQuitCallback,
};
