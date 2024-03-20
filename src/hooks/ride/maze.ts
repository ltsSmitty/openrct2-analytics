/** Mazes work in a really jank way
 * e.g. they call `mazetrackset` for every single piece of track when you delete one
 * and they don't call `trackplace`. Be prepared to be spammed by this event,
 * as I haven't found an elegant filter yet.
 */
export const onMazeSetTrack = (callback: TCallback): IDisposable =>
  context.subscribe(
    "action.execute",
    (data: GameActionEventArgs<MazeSetTrackArgs>) => {
      if (
        data.action === "mazesettrack" &&
        data.args.flags &&
        data.args.flags < 0
      ) {
        callback(data);
      }
    }
  );

/**
 * This only gets called with flags >=0 (aka during contruction), so it will never show under these conditions.
 * It appears relevant for how mazes are built but not useful for analytics.
 */
export const onMazePlaceTrack = (callback: TCallback): IDisposable =>
  context.subscribe(
    "action.execute",
    (data: GameActionEventArgs<MazePlaceTrackArgs>) => {
      if (
        data.action === "mazeplacetrack" &&
        data.args.flags &&
        data.args.flags < 0
      ) {
        callback(data);
      }
    }
  );
