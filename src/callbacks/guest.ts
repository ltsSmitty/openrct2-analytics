import { analytics } from "openrct2-analytics-sdk";
export const guestGeneratedCallback = (
  args: EventCast<GuestGenerationArgs>,
) => {
  analytics.track({
    name: "Guest generated",
    properties: args,
  });
};

export const guestSetNameCallback = (args: EventCast<GuestSetNameArgs>) => {
  analytics.track({
    name: "Guest name set",
    properties: args,
  });
};

export const guestSetFlagsCallback = (args: EventCast<GuestSetFlagsArgs>) => {
  analytics.track({
    name: "Guest flags set",
    properties: args,
  });
};

export const peepPickupCallback = (args: EventCast<PeepPickupArgs>) => {
  analytics.track({
    name: "Peep picked up",
    properties: args,
  });
};

export const peepSetDownCallback = (args: EventCast<PeepPickupArgs>) => {
  analytics.track({
    name: "Peep set down",
    properties: args,
  });
};

export const staffHiredCallback = (args: EventCast<StaffHireArgs>) => {
  analytics.track({
    name: "Staff hired",
    properties: args,
  });
};

export const staffFiredCallback = (args: EventCast<StaffFireArgs>) => {
  analytics.track({
    name: "Staff fired",
    properties: args,
  });
};

export const staffSetColourCallback = (args: EventCast<StaffSetColourArgs>) => {
  analytics.track({
    name: "Staff colour set",
    properties: args,
  });
};

export const staffSetNameCallback = (args: EventCast<StaffSetNameArgs>) => {
  analytics.track({
    name: "Staff name set",
    properties: args,
  });
};

export const staffSetCostumeCallback = (
  args: EventCast<StaffSetCostumeArgs>,
) => {
  analytics.track({
    name: "Staff costume set",
    properties: args,
  });
};

export const staffSetOrdersCallback = (args: EventCast<StaffSetOrdersArgs>) => {
  analytics.track({
    name: "Staff orders set",
    properties: args,
  });
};

export const staffSetPatrolAreaCallback = (
  args: EventCast<StaffSetPatrolAreaArgs>,
) => {
  analytics.track({
    name: "Staff patrol area set",
    properties: args,
  });
};
