export const onOtherAction = <T extends OtherAction>(
  otherAction: T,
  callback: TCallback,
) => {
  switch (otherAction) {
    default:
      return context.subscribe(
        "action.execute",
        (data: GameActionEventArgs<object>) => {
          if (data.action === otherAction && (data.args as any).flags <= 0) {
            callback(data);
          }
        },
      );
  }
};
