import { useRideQueryHook } from "./utilityHooks";

/** Utility type to make typing easier in hooks */
type RideActionShape = {
  action: RideAction;
  args: { flags: number; ride: number };
  result: { ride: number };
};

const onRideRatingsCalculate = (callback: TCallback) => {
  return context.subscribe("ride.ratings.calculate", (data) => {
    const args = {
      action: "ride.ratings.calculate",
      args: data,
    } as GameActionEventArgs<object>;
    callback(args);
  });
};

const onRideStallCreate = (
  rideCreateCallback?: TCallback,
  stallCreateCallback?: TCallback
) => {
  return context.subscribe("action.execute", (d) => {
    const data = d as unknown as RideActionShape;

    if (data.action === "ridecreate" && data.args.flags <= 0) {
      const classification = map.getRide(data.result.ride).classification;
      if (
        (classification === "stall" || classification === "facility") &&
        stallCreateCallback
      ) {
        data.action = "stallcreate";
        stallCreateCallback(data as unknown as GameActionEventArgs<object>);
      } else if (rideCreateCallback && classification === "ride") {
        rideCreateCallback(d);
      }
    }
  });
};

const onRideSetSetting = (callback: TCallback) => {
  let rideSetSettingHistory:
    | {
        ride: number;
        setting: number;
        value: number;
      }
    | undefined;

  /**
   * If the user has changed their default inspection interval,
   * this query will get when placing a prebuilt coaster every tick with that value
   * This will let it call once, but then ignore it until it changes.
   */
  const queryHook = useRideQueryHook("ridesetsetting", (d) => {
    const data = d as unknown as RideActionShape & {
      args: { value: number; setting: number };
    };
    const rideID = data.args.ride;
    const ride = map.getRide(rideID);

    const INSPECTION_INTERVAL_ENUM = 5;
    if (
      data.args.setting === INSPECTION_INTERVAL_ENUM &&
      data?.args.value !== ride.inspectionInterval
    ) {
      if (
        !rideSetSettingHistory ||
        rideSetSettingHistory.value !== data.args.value
      ) {
        rideSetSettingHistory = {
          ride: rideID,
          setting: data.args.flags,
          value: data.args.value,
        };
        callback(data as unknown as GameActionEventArgs<object>);
      }
    }
  });
  return queryHook;
};

const onRideStallDemolish = (
  rideDemolishCallback?: TCallback,
  stallDemolishCallback?: TCallback
): IDisposable => {
  /** When removing a ride, it's impossible to tell what classifiaction the ride had after it is removed.
   * This forces us to hook into the query and save the ride classification
   * so then we can use it in the execute hook to determine whether it was a stall or ride
   */
  let rideQueriedToRemove:
    | {
        ride: number;
        classification: RideClassification;
      }
    | undefined;

  const queryHook = useRideQueryHook("ridedemolish", (d) => {
    const data = d as unknown as RideActionShape;
    const rideId = data.args.ride;
    const ride = map.getRide(rideId);
    rideQueriedToRemove = {
      ride: rideId,
      classification: ride.classification,
    };
  });

  const executeHook = context.subscribe("action.execute", (d) => {
    const data = d as unknown as RideActionShape;

    if (
      data.action === "ridedemolish" &&
      data.args.flags <= 0 &&
      rideQueriedToRemove
    ) {
      if (
        rideDemolishCallback &&
        rideQueriedToRemove.classification === "ride"
      ) {
        rideDemolishCallback(d as GameActionEventArgs<object>);
        rideQueriedToRemove = undefined;
      } else {
        if (
          stallDemolishCallback &&
          (rideQueriedToRemove.classification === "stall" ||
            rideQueriedToRemove.classification === "facility")
        ) {
          data.action = "stalldemolish";
          stallDemolishCallback(data as unknown as GameActionEventArgs<object>);
          rideQueriedToRemove = undefined;
        }
      }
    }
  });

  return {
    dispose: () => {
      queryHook.dispose();
      executeHook.dispose();
    },
  };
};

export const onRideChange = <T extends RideAction>(
  rideAction: T,
  callback: TCallback
) => {
  switch (rideAction) {
    case "ride.ratings.calculate":
      return onRideRatingsCalculate(callback);
    case "ridedemolish":
      return onRideStallDemolish(callback);
    case "stalldemolish":
      return onRideStallDemolish(undefined, callback);
    case "ridecreate":
      return onRideStallCreate(callback);
    case "stallcreate":
      return onRideStallCreate(undefined, callback);
    case "ridesetsetting":
      return onRideSetSetting(callback);
    default:
      return context.subscribe(
        "action.execute",
        (data: GameActionEventArgs<object>) => {
          // todo see if there's a better way than flags <= 0
          if (data.action === rideAction && (data.args as any).flags < 0) {
            callback(data);
          }
        }
      );
  }
};
