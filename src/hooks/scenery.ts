export const onChangeScenery = <T extends SceneryAction>(
  sceneryAction: T,
  callback: TCallback
) => {
  switch (sceneryAction) {
    default:
      return context.subscribe("action.execute", (data) => {
        if (data.action === sceneryAction && data.args.flags < 0) {
          callback(data);
        }
      });
  }
};
