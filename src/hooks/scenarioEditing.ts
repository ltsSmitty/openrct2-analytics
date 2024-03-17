const ENTRACE_PLACE_REMOVE_SUCCESS_FLAG = -2147483648;

export type PlacePeepSpawnArgs = GameActionEventArgs & {
  action: "peepspawnplace";
  args: PeepSpawnPlaceArgs;
  result: GameActionResult & {
    position: CoordsXYZ;
    expenditureType: "land_purchase";
  };
};

export const onPlacePeepSpawn = (
  callback: (guest: PlacePeepSpawnArgs) => void
) => {
  context.subscribe("action.execute", (d) => {
    const data = d as PlacePeepSpawnArgs;
    if (data.action === "peepspawnplace") {
      callback(data);
    }
  });
};

export const onScenarioEditorMapChanged = (callback: () => void) => {
  context.subscribe("map.changed", () => {
    if (context.mode === "scenario_editor") {
      callback();
    }
  });
};

export const onTrackDesignerMapChanged = (callback: () => void) => {
  context.subscribe("map.changed", () => {
    if (context.mode === "track_designer") {
      callback();
    }
  });
};

export const onTrackManagerMapChanged = (callback: () => void) => {
  context.subscribe("map.changed", () => {
    if (context.mode === "track_manager") {
      callback();
    }
  });
};

export const onMapSizeChange = (callback: () => void) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "changemapsize") {
      callback();
    }
  });
};

export type ClimateSetEventArgs = GameActionEventArgs & {
  action: "climateset";
  args: ClimateSetArgs;
};

export const onClimateSet = (callback: (args: ClimateSetEventArgs) => void) => {
  context.subscribe("action.execute", (d) => {
    const data = d as ClimateSetEventArgs;
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

export const onParkEntrancePlaced = (
  callback: (args: EntrancePlaceEventArgs) => void
) => {
  context.subscribe("action.execute", (d) => {
    const data = d as EntrancePlaceEventArgs;
    if (
      data.action === "parkentranceplace" &&
      data.args.flags === ENTRACE_PLACE_REMOVE_SUCCESS_FLAG
    ) {
      callback(data);
    }
  });
};

export const onParkEntranceRemoved = (
  callback: (args: EntranceRemoveEventArgs) => void
) => {
  context.subscribe("action.execute", (d) => {
    const data = d as EntranceRemoveEventArgs;
    if (
      data.action === "parkentranceremove" &&
      data.args.flags === ENTRACE_PLACE_REMOVE_SUCCESS_FLAG
    ) {
      callback(data);
    }
  });
};
