const onRideRatingsCalculate = (callback: TCallback) => {
  return context.subscribe("ride.ratings.calculate", (data) => {
    const args = {
      action: "ride.ratings.calculate",
      args: data,
    } as GameActionEventArgs<object>;
    callback(args);
  });
};

export const onRideChange = <T extends RideAction>(
  rideAction: T,
  callback: TCallback
) => {
  switch (rideAction) {
    case "ride.ratings.calculate":
      return onRideRatingsCalculate(callback);
    default:
      return context.subscribe(
        "action.execute",
        (data: GameActionEventArgs<object>) => {
          // todo see if there's a better way than flags <= 0
          if (data.action === rideAction && (data.args as any).flags <= 0) {
            callback(data);
          }
        }
      );
  }
};
