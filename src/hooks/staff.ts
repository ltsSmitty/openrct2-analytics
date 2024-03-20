type TCallback = (args: GameActionEventArgs<object> | undefined) => void;

export const onStaffAction = <T extends StaffAction>(
  staffAction: T,
  callback: TCallback,
) => {
  return context.subscribe("action.execute", (data) => {
    if (data.action === staffAction) {
      callback(data);
    }
  });
};
