export const onPlacePeepSpawn = (
  callback: (guest: PlacePeepSpawnArgs) => void
) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "placepeepspawn") {
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
