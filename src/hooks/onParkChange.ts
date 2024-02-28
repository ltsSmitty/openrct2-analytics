import { analytics } from "../objects/analytics";

const onMapSaved = (mapSavedCallback: () => void) => {
  context.subscribe("map.save", mapSavedCallback);
};

const onMapChanged = (props: {
  titleScreenMapChangedCallback: () => void;
  inGameMapChangeCallback: () => void;
  scenarioEditorMapChangedCallback: () => void;
  trackDesignerMapChangedCallback: () => void;
  trackManagerMapChangedCallback: () => void;
}) => {
  context.subscribe("map.changed", () => {
    switch (context.mode) {
      case "title":
        props.titleScreenMapChangedCallback();
        break;
      case "normal":
        props.inGameMapChangeCallback();
        break;
      case "scenario_editor":
        props.scenarioEditorMapChangedCallback();
        break;
      case "track_designer":
        props.trackDesignerMapChangedCallback();
        break;
      default:
        props.trackManagerMapChangedCallback();
    }
  });
};

const onLoadOrQuit = (
  loadOrQuitCallback: (result: GameActionEventArgs) => void
) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "loadorquit") {
      loadOrQuitCallback(data);
    }
  });
};

export const onParkChange = () => {
  context.subscribe("map.save", () => {
    analytics.track("Map saved");
    analytics.flush();
  });

  // triggers when the map is changed, using the new map data
  context.subscribe("map.changed", () => {
    switch (context.mode) {
      case "title":
        analytics.track("Title screen map changed");
        break;
      case "normal":
        analytics.track("Map changed");
        break;
      case "scenario_editor":
        analytics.track("Scenario editor map changed");
        break;
      case "track_designer":
        analytics.track("Track designer map changed");
        break;
      default:
        analytics.track("Track manager map changed");
    }
  });

  context.subscribe("action.execute", (data) => {
    if (data.action === "loadorquit") {
      analytics.track("Load or quit");
      analytics.flush();
    }
  });
};
