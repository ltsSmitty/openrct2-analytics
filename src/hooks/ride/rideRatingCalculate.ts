import { areObjectValuesEqual } from "../../utilities/compareObjectValues";

export const onRideRatingsCalculate = (callback: TCallback) => {
  let ratingsMap: Record<number, any> = {};
  return context.subscribe("ride.ratings.calculate", (data) => {
    const args = {
      action: "ride.ratings.calculate",
      args: data,
    } as GameActionEventArgs<object>;

    if (areObjectValuesEqual(ratingsMap[data.rideId], args.args)) {
      return;
    } else {
      ratingsMap[data.rideId] = args.args;
      callback(args);
    }
  });
};
