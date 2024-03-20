import { useRideQueryHook } from "../utilityHooks";

export const onRideSetSetting = (callback: TCallback) => {
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
