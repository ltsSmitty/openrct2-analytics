export const onVehicleCrash = (callback: TCallback): IDisposable => {
  return context.subscribe("vehicle.crash", (data) => {
    const args = {
      action: "vehicle.crash",
      args: data,
    } as GameActionEventArgs;
    callback(args);
  });
};
