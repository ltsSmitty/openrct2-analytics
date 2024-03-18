type TCallback = (args: GameActionEventArgs<object> | undefined) => void;

export const onChangeScenery = <T extends LandscapeAction>(
  sceneryAction: T,
  callback: TCallback
) => {
  return context.subscribe("action.execute", (data) => {
    if (data.action === sceneryAction) {
      callback(data);
    }
  });
};
