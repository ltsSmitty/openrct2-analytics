export const onMapSaved = (callback: () => void) => {
  context.subscribe("map.save", callback);
};

export const onTitleScreenMapChanged = (callback: () => void) => {
  context.subscribe("map.changed", () => {
    if (context.mode === "title") {
      callback();
    }
  });
};

export const onInGameMapChanged = (callback: () => void) => {
  context.subscribe("map.changed", () => {
    if (context.mode === "normal") {
      callback();
    }
  });
};

export const onLoadOrQuit = (
  loadOrQuitCallback: (result: GameActionEventArgs) => void
) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "loadorquit") {
      loadOrQuitCallback(data);
    }
  });
};
