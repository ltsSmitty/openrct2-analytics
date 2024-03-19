const ENTRACE_PLACE_REMOVE_SUCCESS_FLAG = -2147483648;

type TCallback = (args: GameActionEventArgs<object> | undefined) => void;

const onPlacePeepSpawn = (callback: TCallback) => {
  return context.subscribe("action.execute", (data) => {
    if (data.action === "peepspawnplace") {
      callback(data);
    }
  });
};

const onScenarioEditorMapChanged = (callback: TCallback) => {
  return context.subscribe("map.changed", () => {
    if (context.mode === "scenario_editor") {
      callback(undefined);
    }
  });
};

const onTrackDesignerMapChanged = (callback: TCallback) => {
  return context.subscribe("map.changed", () => {
    if (context.mode === "track_designer") {
      callback(undefined);
    }
  });
};

const onTrackManagerMapChanged = (callback: TCallback) => {
  return context.subscribe("map.changed", () => {
    if (context.mode === "track_manager") {
      callback(undefined);
    }
  });
};

const onMapSizeChange = (callback: TCallback) => {
  return context.subscribe("action.execute", (data) => {
    if (data.action === "changemapsize") {
      callback(undefined);
    }
  });
};

const onClimateSet = (callback: TCallback) => {
  return context.subscribe("action.execute", (data) => {
    if (data.action === "climateset") {
      callback(data);
    }
  });
};

type EntrancePlaceEventArgs = GameActionEventArgs & {
  action: "parkentranceplace";
  args: ParkEntrancePlaceArgs;
};

type EntranceRemoveEventArgs = GameActionEventArgs & {
  action: "parkentranceremove";
  args: ParkEntranceRemoveArgs;
};

const onParkEntrancePlaced = (
  callback: (args: EntrancePlaceEventArgs) => void
) => {
  return context.subscribe("action.execute", (d) => {
    const data = d as EntrancePlaceEventArgs;
    if (
      data.action === "parkentranceplace" &&
      data.args.flags === ENTRACE_PLACE_REMOVE_SUCCESS_FLAG
    ) {
      callback(data);
    }
  });
};

const onParkEntranceRemoved = (
  callback: (args: EntranceRemoveEventArgs) => void
) => {
  return context.subscribe("action.execute", (d) => {
    const data = d as EntranceRemoveEventArgs;
    if (
      data.action === "parkentranceremove" &&
      data.args.flags === ENTRACE_PLACE_REMOVE_SUCCESS_FLAG
    ) {
      callback(data);
    }
  });
};

export const onScenarioEdit = <T extends ScenarioEditingAction>(
  action: T,
  callback: TCallback
) => {
  switch (action) {
    case "peepspawnplace":
      return onPlacePeepSpawn(callback);
    case "mapchanged_scenarioEditor":
      return onScenarioEditorMapChanged(callback);
    case "mapchanged_trackDesigner":
      return onTrackDesignerMapChanged(callback);
    case "mapchanged_trackManager":
      return onTrackManagerMapChanged(callback);
    case "changemapsize":
      return onMapSizeChange(callback);
    case "climateset":
      return onClimateSet(callback);
    case "parkentranceplace":
      return onParkEntrancePlaced(
        callback as (args: EntrancePlaceEventArgs) => void
      );
    case "parkentranceremove":
      return onParkEntranceRemoved(
        callback as (args: EntranceRemoveEventArgs) => void
      );
    default:
      return context.subscribe("action.execute", (data) => {
        if (data.action === action) {
          callback(data);
        }
      });
  }
};
