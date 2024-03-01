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

export type StaffSetColourArgs = GameActionEventArgs & {
  action: "staffsetcolour";
  args: {
    staffType: StaffType;
    colour: number;
    flags: number;
  };
};

export const onStaffSetColour = (
  callback: (staff: StaffSetColourArgs) => void
) => {
  context.subscribe("action.execute", (d) => {
    const data = d as StaffSetColourArgs;
    if (data.action === "staffsetcolour") {
      callback(data);
    }
  });
};

export type StaffSetNameArgs = GameActionEventArgs & {
  action: "staffsetname";
  args: {
    id: number;
    name: string;
    flags: number;
  };
  result: GameActionResult & {
    position: CoordsXYZ;
  };
};

export const onStaffSetName = (callback: (staff: StaffSetNameArgs) => void) => {
  context.subscribe("action.execute", (d) => {
    const data = d as StaffSetNameArgs;
    if (data.action === "staffsetname") {
      callback(data);
    }
  });
};

export type StaffSetCostumeArgs = GameActionEventArgs & {
  action: "staffsetcostume";
  args: {
    id: number;
    costume: number;
    flags: number;
  };
  result: GameActionResult & {
    position: CoordsXYZ;
  };
};

export const onStaffSetCostume = (
  callback: (staff: StaffSetCostumeArgs) => void
) => {
  context.subscribe("action.execute", (d) => {
    const data = d as StaffSetCostumeArgs;
    if (data.action === "staffsetcostume") {
      callback(data);
    }
  });
};

export enum MechanicOrderFlags {
  None = 0,
  InspectRides = 1,
  FixRides = 2,
}

export enum HandymanOrderFlags {
  None = 0,
  SweepFootpaths = 1,
  WaterGardens = 2,
  EmptyBins = 4,
  MowGrass = 8,
}

export type StaffSetOrdersArgs = GameActionEventArgs & {
  action: "staffsetorders";
  args: {
    id: number;
    /**
     * This is a flag value that is made by summing the respective flags for the staff.
     * To have a handyman that does all the tasks, the staffOrders value would be 15 (1 + 2 + 4 + 8)
     * To have a mechanic that does all the tasks, the staffOrders value would be 3 (1 + 2)
     * To have a mechanic that only inspects rides, the staffOrders value would be 1, etc.
     */
    staffOrders: MechanicOrderFlags | HandymanOrderFlags;
    flags: number;
  };
  result: GameActionResult & {
    position: CoordsXYZ;
  };
};

export const onStaffSetOrders = (
  callback: (staff: StaffSetOrdersArgs) => void
) => {
  context.subscribe("action.execute", (d) => {
    const data = d as StaffSetOrdersArgs;
    if (data.action === "staffsetorders") {
      callback(data);
    }
  });
};

export enum StaffPatrolMode {
  PatrolThisArea = 0,
  SkipThisArea = 1,
}

export type StaffSetPatrolAreaArgs = GameActionEventArgs & {
  action: "staffsetpatrolarea";
  args: {
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    mode: StaffPatrolMode;
    flags: number;
  };
};

export const onStaffSetPatrolArea = (
  callback: (staff: StaffSetPatrolAreaArgs) => void
) => {
  context.subscribe("action.execute", (d) => {
    const data = d as StaffSetPatrolAreaArgs;
    if (data.action === "staffsetpatrolarea") {
      callback(data);
    }
  });
};
