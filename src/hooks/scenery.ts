type TCallback = (args: GameActionEventArgs<object> | undefined) => void;

const onSurfaceSetStyle = (callback: TCallback) => {
  return context.subscribe("action.execute", (data) => {
    if (data.action === "surfacesetstyle" && data.result.cost !== 0) {
      callback(data);
    }
  });
};

export const onChangeScenery = <T extends LandscapeAction>(
  sceneryAction: T,
  callback: TCallback
) => {
  switch (sceneryAction) {
    case "surfacesetstyle":
      return onSurfaceSetStyle(callback);
    default:
      return context.subscribe("action.execute", (data) => {
        if (data.action === sceneryAction) {
          callback(data);
        }
      });
  }
};
