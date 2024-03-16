import * as hooks from "../hooks/guest";
import { analytics } from "openrct2-analytics";

export const guestGeneratedCallback = (args: GuestGenerationArgs) => {
  analytics.track({
    name: "Guest generated",
    properties: args,
  });
};

export const guestSetNameCallback = (args: hooks.GuestSetNameArgs) => {
  analytics.track({
    name: "Guest name set",
    properties: args,
  });
};

export const guestSetFlagsCallback = (args: hooks.GuestSetFlagsArgs) => {
  analytics.track({
    name: "Guest flags set",
    properties: args,
  });
};

export const peepPickupCallback = (args: hooks.PeepPickupArgs) => {
  analytics.track({
    name: "Peep picked up",
    properties: args,
  });
};

export const peepSetDownCallback = (args: hooks.PeepPickupArgs) => {
  analytics.track({
    name: "Peep set down",
    properties: args,
  });
};

export const staffHiredCallback = (args: hooks.StaffHiredArgs) => {
  analytics.track({
    name: "Staff hired",
    properties: args,
  });
};

export const staffFiredCallback = (args: hooks.StaffFiredArgs) => {
  analytics.track({
    name: "Staff fired",
    properties: args,
  });
};

export const staffSetColourCallback = (args: hooks.StaffSetColourArgs) => {
  analytics.track({
    name: "Staff colour set",
    properties: args,
  });
};

export const staffSetNameCallback = (args: hooks.StaffSetNameArgs) => {
  analytics.track({
    name: "Staff name set",
    properties: args,
  });
};

export const staffSetCostumeCallback = (args: hooks.StaffSetCostumeArgs) => {
  analytics.track({
    name: "Staff costume set",
    properties: args,
  });
};

export const staffSetOrdersCallback = (args: hooks.StaffSetOrdersArgs) => {
  analytics.track({
    name: "Staff orders set",
    properties: args,
  });
};

export const staffSetPatrolAreaCallback = (
  args: hooks.StaffSetPatrolAreaArgs
) => {
  analytics.track({
    name: "Staff patrol area set",
    properties: args,
  });
};
