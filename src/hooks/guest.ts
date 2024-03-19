const onGuestGenerated = (callback: TCallback) => {
  return context.subscribe("guest.generation", (data) => {
    const args = {
      action: "guest.generated",
      args: data,
    } as GameActionEventArgs<object>;
    callback(args);
  });
};

enum PeepPickupType {
  PickUp = 0,
  SetDown = 1,
  /**
   * Gets called when the guest is dropped, but then type 1 always get called afterwards
   * could be some sort of query, but it's not clear what it's querying
   */
  Unknown = 2,
}

type PeepPickupArgs = GameActionEventArgs & {
  action: "peeppickup";
  args: {
    type: PeepPickupType;
  };
};

const onPeepPickup = (callback: (guest: PeepPickupArgs) => void) => {
  context.subscribe("action.execute", (d) => {
    const data = d as PeepPickupArgs;
    if (data.action === "peeppickup" && data.args.type === 0) {
      callback(data);
    }
  });
};

const onPeepSetDown = (callback: (guest: PeepPickupArgs) => void) => {
  context.subscribe("action.execute", (d) => {
    const data = d as PeepPickupArgs;
    if (data.action === "peeppickup" && data.args.type === 1) {
      callback(data);
    }
  });
};

export const onGuestEvent = <T extends GuestAction>(
  guestAction: T,
  callback: TCallback
) => {
  switch (guestAction) {
    case "peeppickup":
      return onPeepPickup(callback);
    case "peepsetdown":
      return onPeepSetDown(callback);
    case "guest.generated":
      return onGuestGenerated(callback);
    default:
      return context.subscribe("action.execute", (data) => {
        if (data.action === guestAction) {
          callback(data);
        }
      });
  }
};
