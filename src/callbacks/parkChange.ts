import { analytics } from "../objects/analytics";

export const mapSavedCallback = () => {
  analytics.track("Map saved");
};

export const titleScreenMapChangedCallback = () => {
  analytics.track("Title screen map changed");
};

export const inGameMapChangeCallback = () => {
  analytics.track("Map changed");
};

export const loadOrQuitCallback = (_result: GameActionEventArgs) => {
  analytics.track("Load or quit");
  analytics.flush();
};
