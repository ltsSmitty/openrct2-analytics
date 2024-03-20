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

/**
 * The core issue is that placing a tracked ride calls create > demolish > create.
 * This addresses that.
 */
type RideCreateDemolishQueue = {
  ride: number;
  action: "create" | "demolish";
  timeStamp: number;
};

const rideCreateDemolishQueue: RideCreateDemolishQueue[] = [];
let isInTrackedRideCreateLoop: boolean = false;

const onRideStallCreate = (
  rideCreateCallback?: TCallback,
  stallCreateCallback?: TCallback
) => {
  const rideCreateDemolishHook = context.subscribe(
    "action.execute",
    (data: GameActionEventArgs<object>) => {
      const action = data.action as RideAction;
      if (action !== "ridecreate" && action !== "ridedemolish") return;

      if (action === "ridedemolish") {
        console.log(`ride demolish action`, data);
      }

      // filter out simulated builds by filtering out flags >= 0
      if ((data.args as any).flags >= 0) return;

      // handle stall/facility creation
      if (action === "ridecreate") {
        const classification = map.getRide(
          (data.result as any).ride
        ).classification;
        if (
          (classification === "stall" || classification == "facility") &&
          stallCreateCallback
        ) {
          stallCreateCallback(data);
          return;
        }
      }

      // handle ride creation/demolish loop
      // only add the demolish if it's not the same as before
      addDataToQueue(action, data);

      const timebetween =
        rideCreateDemolishQueue[0]?.timeStamp -
        rideCreateDemolishQueue[1]?.timeStamp;

      // start with if the most recent event was ridecreate
      if (action === "ridecreate")
        if (
          rideCreateDemolishQueue[1]?.action === "demolish" &&
          // make sure the ride is the same
          rideCreateDemolishQueue[0]?.ride ===
            rideCreateDemolishQueue[1]?.ride &&
          // it should
          timebetween < 10
        ) {
          // the loop is completed at this point
          isInTrackedRideCreateLoop = false;
        } else {
          if (rideCreateCallback) {
            rideCreateCallback(data);
            isInTrackedRideCreateLoop = true;
          }
        }
    }
  );

  return rideCreateDemolishHook;
};

const onRideSetSetting = (callback: TCallback) => {
  let rideSetSettingHistory:
    | {
        ride: number;
        setting: number;
        value: number;
      }
    | undefined;

  let shouldUpdate = false;

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
        shouldUpdate = true;
        // callback(data as unknown as GameActionEventArgs<object>);
      }
    }
  });

  const onExecuteHook = context.subscribe("action.execute", (d) => {
    const data = d as unknown as RideActionShape & {
      args: { value: number; setting: number };
    };
    if (data.action === "ridesetsetting" && data.args.flags <= 0) {
      if (shouldUpdate) {
        callback(data as unknown as GameActionEventArgs<object>);
        shouldUpdate = false;
      }
    }
  });

  return {
    dispose: () => {
      queryHook.dispose();
      onExecuteHook.dispose();
    },
  };
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
      console.log(
        `queue data`,
        rideCreateDemolishQueue[0]?.action,
        rideCreateDemolishQueue[1]?.action
      );
      console.log(
        `time between`,
        rideCreateDemolishQueue[0]?.timeStamp -
          rideCreateDemolishQueue[1]?.timeStamp
      );
      if (rideCreateDemolishQueue[0]?.timeStamp > new Date().getTime() - 10) {
        isInTrackedRideCreateLoop = false;
      }
      console.log(`isInTrackedRideCreateLoop`, isInTrackedRideCreateLoop);
      if (
        rideDemolishCallback &&
        rideQueriedToRemove.classification === "ride" &&
        !isInTrackedRideCreateLoop
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
      return onRideStallCreate(callback, undefined);
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

const addDataToQueue = (
  action: RideAction,
  data: GameActionEventArgs<object>
) => {
  const queueData = {
    ride:
      action === "ridecreate"
        ? (data.result as any).ride
        : (data.args as any).ride,
    action: action === "ridecreate" ? "create" : "demolish",
    timeStamp: new Date().getTime(),
  };

  rideCreateDemolishQueue.unshift(queueData as RideCreateDemolishQueue);

  if (rideCreateDemolishQueue.length > 3) {
    rideCreateDemolishQueue.pop();
  }
};
