type TCallback = (args: GameActionEventArgs<object> | undefined) => void;

const onMapSaved = (callback: TCallback) => {
  return context.subscribe("map.save", callback);
};
const onTitleScreenMapChanged = (callback: TCallback) => {
  return context.subscribe("map.changed", () => {
    if (context.mode === "title") {
      callback(undefined);
    }
  });
};

const onInGameMapChanged = (callback: TCallback) => {
  return context.subscribe("map.changed", () => {
    if (context.mode === "normal") {
      callback(undefined);
    }
  });
};

const onLoadOrQuit = (callback: TCallback) => {
  return context.subscribe("action.execute", (data) => {
    if (data.action === "loadorquit") {
      callback(data);
    }
  });
};

export const onParkChange = <T extends ParkChangeAction>(
  parkChangeAction: T,
  callback: TCallback
) => {
  switch (parkChangeAction) {
    case "mapsaved":
      return onMapSaved(callback);
    case "mapchanged_titleScreen":
      return onTitleScreenMapChanged(callback);
    case "mapchanged_inGame":
      return onInGameMapChanged(callback);
    case "loadorquit":
      return onLoadOrQuit(callback);
    default:
      throw new Error(`No action found for ${parkChangeAction}`);
  }
};
