/** Utility type to make typing easier in hooks */
type RideActionShape = {
  action: RideAction;
  args: { flags: number; ride: number };
  result: { ride: number };
};

/**
 * Custom hook for subscribing to query actions.
 * @param {T} action - The hook action to subscribe to.
 * @param {(data: GameActionEventArgs<object>) => void} callback - The callback function to be called when the action is triggered.
 * @param {(action: T, data: GameActionEventArgs<object>) => boolean} [filterFn] - Optional filter function to further filter the action and data.
 * @returns {QueryHook} - The query hook object.
 */
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

/**
 * Filter function for ride actions.
 * @param {RideAction} action - The ride action to filter.
 * @param {GameActionEventArgs<object>} data - The game action event data.
 * @returns {boolean} - True if the action matches the filter criteria, false otherwise.
 */
const rideFilter = (action: RideAction, data: GameActionEventArgs<object>) => {
  const rideData = data as unknown as RideActionShape;
  return rideData.action === action && rideData.args.flags < 0;
};

/**
 * Utility hook for subscribing to ride query actions.
 * @param {T} action - The ride action query to subscribe to.
 * @param {TCallback} cb - The callback function to be called when the action is queried.
 * @returns {QueryHook} - The query hook object.
 */
export const useRideQueryHook = <T extends RideAction>(
  action: T,
  cb: TCallback
) => useQueryHook(action, cb, rideFilter);
