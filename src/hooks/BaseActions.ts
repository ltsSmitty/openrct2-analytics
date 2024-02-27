import track from "../track/track";

const onRideRatingsCalculate = (
  callback: (changedValue: RideRatingsCalculateArgs) => void
) => {
  context.subscribe("ride.ratings.calculate", callback);
};
