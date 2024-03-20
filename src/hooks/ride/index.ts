import { onRideStallDemolish, onRideStallCreate } from "./createDemolish";
import { onMazePlaceTrack, onMazeSetTrack } from "./maze";
import { onRideRatingsCalculate } from "./rideRatingCalculate";
import { onRideSetSetting } from "./setSetting";
import { onVehicleCrash } from "./vehicleCrash";

export const onRideChange = <T extends RideAction>(
  rideAction: T,
  callback: TCallback
) => {
  switch (rideAction) {
    case "mazeplacetrack":
      return onMazePlaceTrack(callback);
    case "mazesettrack":
      return onMazeSetTrack(callback);
    case "ride.ratings.calculate":
      return onRideRatingsCalculate(callback);
    case "ridedemolish":
      return onRideStallDemolish(callback);
    case "stalldemolish":
      return onRideStallDemolish(undefined, callback);
    case "ridecreate":
      return onRideStallCreate(callback, undefined);
    case "stallcreate":
      return onRideStallCreate(undefined, callback);
    case "ridesetsetting":
      return onRideSetSetting(callback);
    case "vehicle.crash":
      return onVehicleCrash(callback);
    default:
      return context.subscribe(
        "action.execute",
        (data: GameActionEventArgs<object>) => {
          // todo see if there's a better way than flags <= 0
          if (data.action === rideAction && (data.args as any).flags < 0) {
            // console.log(`tracking other ride action`, data.action);
            callback(data);
          }
        }
      );
  }
};
