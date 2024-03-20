import { useRideQueryHook } from "../utilityHooks";

/**
 * The core issue with tracking ride creation is that placing a tracked ride calls create > demolish > create.
 * This addresses that.
 */
type RideCreateDemolishQueue = {
  ride: number;
  action: "create" | "demolish";
  timeStamp: number;
};

/** Set up a queue to track where in the track place process it is */
const rideCreateDemolishQueue: RideCreateDemolishQueue[] = [];
let isInTrackedRideCreateLoop: boolean = false;

export const onRideStallCreate = (
  rideCreateCallback?: TCallback,
  stallCreateCallback?: TCallback,
) => {
  const rideCreateDemolishHook = context.subscribe("action.execute", (d) => {
    const action = d.action;

    if (action !== "ridecreate" && action !== "ridedemolish") return;

    // filter out simulated builds by filtering out flags >= 0
    if ((d.args as any).flags >= 0) return;

    // handle stall/facility creation
    if (action === "ridecreate") {
      const data = d as EventCast<RideCreateArgs, RideCreateActionResult>;

      const classification = map.getRide(data.result.ride).classification;
      if (classification === "stall" || classification == "facility") {
        data.action = "stallcreate";
        if (stallCreateCallback) {
          stallCreateCallback(data as EventCast<RideCreateArgs>);
        }
      }
    }

    // early returning if no stallCreateCallback wasn't working, so needing to guard here
    if (rideCreateCallback) {
      // handle ride creation/demolish loop
      addDataToQueue(action, d);

      const timebetween =
        rideCreateDemolishQueue[0]?.timeStamp -
        rideCreateDemolishQueue[1]?.timeStamp;

      // start with if the most recent event was ridecreate
      if (action === "ridecreate")
        if (
          rideCreateDemolishQueue[1]?.action === "demolish" &&
          rideCreateDemolishQueue[0]?.ride ===
            rideCreateDemolishQueue[1]?.ride &&
          timebetween < 10
        ) {
          // the loop is completed at this point
          isInTrackedRideCreateLoop = false;
        } else {
          rideCreateCallback(d);
          isInTrackedRideCreateLoop = true;
        }
    }
  });
  return rideCreateDemolishHook;
};

export const onRideStallDemolish = (
  rideDemolishCallback?: TCallback,
  stallDemolishCallback?: TCallback,
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
    const data = d as EventCast<RideDemolishArgs>;
    const rideId = data.args.ride;
    const ride = map.getRide(rideId);

    rideQueriedToRemove = {
      ride: rideId,
      classification: ride.classification,
    };
  });

  const executeHook = context.subscribe<RideDemolishArgs>(
    "action.execute",
    (data) => {
      if (
        data.action === "ridedemolish" &&
        data.args.flags &&
        data.args.flags <= 0 &&
        rideQueriedToRemove
      ) {
        const timeBetween =
          rideCreateDemolishQueue[0]?.timeStamp -
          rideCreateDemolishQueue[1]?.timeStamp;

        if (timeBetween > 10) {
          // console.log(`time between events is large`, timeBetween);
          isInTrackedRideCreateLoop = false;
        }
        // console.log(`isInTrackedRideCreateLoop`, isInTrackedRideCreateLoop);

        // make sure it's a real delete event,
        // not one that happens during the tracked ride create loop
        if (
          rideDemolishCallback &&
          rideQueriedToRemove.classification === "ride" &&
          !isInTrackedRideCreateLoop
        ) {
          rideDemolishCallback(data);
          rideQueriedToRemove = undefined;
        } else {
          if (
            stallDemolishCallback &&
            (rideQueriedToRemove.classification === "stall" ||
              rideQueriedToRemove.classification === "facility")
          ) {
            data.action = "stalldemolish";
            stallDemolishCallback(
              data as unknown as GameActionEventArgs<object>,
            );
            rideQueriedToRemove = undefined;
          }
        }
      }
    },
  );

  return {
    dispose: () => {
      queryHook.dispose();
      executeHook.dispose();
    },
  };
};

const addDataToQueue = (action: RideAction, data: GameActionEventArgs) => {
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
