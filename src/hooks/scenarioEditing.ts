export type PlacePeepSpawnArgs = GameActionEventArgs & {
  action: "peepspawnplace";
  args: {
    x: number;
    y: number;
    z: number;
    direction: number;
    flags: number;
  };
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

export enum ClimateType {
  "Cool and wet",
  "Warm",
  "Hot and dry",
  "Cold",
}

export type ClimateSetArgs = GameActionEventArgs & {
  action: "climateset";
  args: {
    climate: ClimateType;
    flags: number;
  };
};

export const onClimateSet = (callback: (args: ClimateSetArgs) => void) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "climateset") {
      callback(data);
    }
  });
};

export const onParkEntranceRemoved = (
  callback: (args: EntranceRemoveArgs) => void
) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "removeparkentrance") {
      callback(data);
    }
  });
};
