/** Utility type to make typing easier in hooks */
type RideActionShape = {
  action: RideAction;
  args: { flags: number; ride: number };
  result: { ride: number };
};

export const useQueryHook = <T extends HookAction>(
  action: T,
  callback: (data: GameActionEventArgs<object>) => void,
  filterFn?: (action: T, data: GameActionEventArgs<object>) => boolean
) => {
  const queryHook = context.subscribe("action.query", (d) => {
    if (d.action !== action) {
      return d.result;
    }
    if (!filterFn || !filterFn(action, d)) {
      return d.result;
    }
    callback(d);
    return d;
  });

  return queryHook;
};

const rideFilter = (action: RideAction, data: GameActionEventArgs<object>) => {
  const rideData = data as unknown as RideActionShape;
  return rideData.action === action && rideData.args.flags <= 0;
};

export const useRideQueryHook = <T extends RideAction>(
  action: T,
  cb: TCallback
) => useQueryHook(action, cb, rideFilter);
