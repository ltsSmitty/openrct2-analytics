export const onGuestGenerated = (
  callback: (guest: GuestGenerationArgs) => void
) => {
  context.subscribe("guest.generation", (data) => {
    callback(data);
  });
};

export const onGuestSetName = (callback: (guest: GuestSetNameArgs) => void) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "guestsetname") {
      callback(data);
    }
  });
};

// todo
export const onGuestSetFlags = (
  callback: (guest: GuestSetFlagsArgs) => void
) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "guestsetflags") {
      callback(data);
    }
  });
};

enum PeepPickupType {
  PickUp = 0,
  SetDown = 1,
  /**
   * Gets called before dropping, but then type 1 always get called afterwards
   * could be some sort of query, but it's not clear what it's querying
   */
  Unknown = 2,
}

export type PeepPickupArgs = GameActionEventArgs & {
  action: "peeppickup";
  args: {
    type: PeepPickupType;
    id: number;
    x: number;
    y: number;
    z: number;
    playerId: number;
    flags: number;
  };
  result: GameActionResult & {
    peep: number;
    expenditureType: "wages";
  };
};

export const onPeepPickup = (callback: (guest: PeepPickupArgs) => void) => {
  context.subscribe("action.execute", (d) => {
    const data = d as PeepPickupArgs;
    if (data.action === "peeppickup" && data.args.type === 0) {
      callback(data);
    }
  });
};

export const onPeepSetDown = (callback: (guest: PeepPickupArgs) => void) => {
  context.subscribe("action.execute", (d) => {
    const data = d as PeepPickupArgs;
    if (data.action === "peeppickup" && data.args.type === 1) {
      callback(data);
    }
  });
};

export type StaffHireArgs = GameActionEventArgs & {
  action: "staffhire";
  args: {
    autoPosition: boolean;
    staffType: StaffType;
    staffId: number;
    entertainerType: number;
    staffOrders: number;
    flags: number;
  };
  result: GameActionResult & {
    expenditureType: "wages";
    peep: number;
  };
};

export const onStaffHire = (callback: (staff: StaffHireArgs) => void) => {
  context.subscribe("action.execute", (d) => {
    const data = d as StaffHireArgs;
    if (data.action === "staffhire") {
      callback(data);
    }
  });
};

export type StaffFireArgs = GameActionEventArgs & {
  action: "stafffire";
  args: {
    id: number;
    flags: number;
  };
};

export const onStaffFire = (callback: (staff: StaffFireArgs) => void) => {
  context.subscribe("action.execute", (d) => {
    const data = d as StaffFireArgs;
    if (data.action === "stafffire") {
      callback(data);
    }
  });
};

export const onStaffSetColour = (
  callback: (staff: StaffSetColourArgs) => void
) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "staffsetcolour") {
      callback(data);
    }
  });
};

export const onStaffSetName = (callback: (staff: StaffSetNameArgs) => void) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "staffsetname") {
      callback(data);
    }
  });
};

export const onStaffSetCostume = (
  callback: (staff: StaffSetCostumeArgs) => void
) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "staffsetcostume") {
      callback(data);
    }
  });
};

export const onStaffSetOrders = (
  callback: (staff: StaffSetOrdersArgs) => void
) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "staffsetorders") {
      callback(data);
    }
  });
};

export const onStaffSetPatrolArea = (
  callback: (staff: StaffSetPatrolAreaArgs) => void
) => {
  context.subscribe("action.execute", (data) => {
    if (data.action === "staffsetpatrolarea") {
      callback(data);
    }
  });
};
