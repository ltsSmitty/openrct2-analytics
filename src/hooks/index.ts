import * as guestHooks from "./guest";
import * as scenarioEditingHooks from "./scenarioEditing";
import * as parkChangeHooks from "./parkChange";
import * as sceneryHooks from "./scenery";
import * as landscapeHooks from "./landscape";
import * as staffHooks from "./staff";
import * as networkHooks from "./network";
import * as parkHooks from "./park";
import * as otherHooks from "./other";
import * as rideHooks from "./ride";
import {
  ExtendedActionType,
  landscapeActions,
  sceneryActions,
  scenarioEditingActions,
  parkChangeActions,
  rideActions,
  guestActions,
  staffActions,
  networkActions,
  otherActions,
  parkActions,
  LandscapeAction,
  SceneryAction,
  ScenarioEditingAction,
  ParkChangeAction,
  RideAction,
  GuestAction,
  StaffAction,
  NetworkAction,
  OtherAction,
  ParkAction,
} from "./actions";

const subscribe = (event: ExtendedActionType, callback: TCallback) => {
  if (eventIsInSection(event, landscapeActions)) {
    return landscapeHooks.onChangeLandscape(event as LandscapeAction, callback);
  } else if (eventIsInSection(event, sceneryActions)) {
    return sceneryHooks.onChangeScenery(event as SceneryAction, callback);
  } else if (eventIsInSection(event, scenarioEditingActions)) {
    return scenarioEditingHooks.onScenarioEdit(event as ScenarioEditingAction, callback);
  } else if (eventIsInSection(event, parkChangeActions)) {
    return parkChangeHooks.onParkChange(event as ParkChangeAction, callback);
  } else if (eventIsInSection(event, rideActions)) {
    return rideHooks.onRideChange(event as RideAction, callback);
  } else if (eventIsInSection(event, guestActions)) {
    return guestHooks.onGuestEvent(event as GuestAction, callback);
  } else if (eventIsInSection(event, staffActions)) {
    return staffHooks.onStaffAction(event as StaffAction, callback);
  } else if (eventIsInSection(event, networkActions)) {
    return networkHooks.onNetworkChange(event as NetworkAction, callback);
  } else if (eventIsInSection(event, otherActions)) {
    return otherHooks.onOtherAction(event as OtherAction, callback);
  } else if (eventIsInSection(event, parkActions)) {
    return parkHooks.onParkAction(event as ParkAction, callback);
  } else {
    throw new Error(`Event ${event} not found`);
  }
};

const landscape = (event: LandscapeAction, callback: TCallback) => {
  return landscapeHooks.onChangeLandscape(event, callback);
};
const scenery = (event: SceneryAction, callback: TCallback) => {
  return sceneryHooks.onChangeScenery(event, callback);
};
const scenarioEditing = (event: ScenarioEditingAction, callback: TCallback) => {
  return scenarioEditingHooks.onScenarioEdit(event, callback);
};
const parkChange = (event: ParkChangeAction, callback: TCallback) => {
  return parkChangeHooks.onParkChange(event, callback);
};
const ride = (event: RideAction, callback: TCallback) => {
  return rideHooks.onRideChange(event, callback);
};
const guest = (event: GuestAction, callback: TCallback) => {
  return guestHooks.onGuestEvent(event, callback);
};
const staff = (event: StaffAction, callback: TCallback) => {
  return staffHooks.onStaffAction(event, callback);
};
const network = (event: NetworkAction, callback: TCallback) => {
  return networkHooks.onNetworkChange(event, callback);
};
const other = (event: OtherAction, callback: TCallback) => {
  return otherHooks.onOtherAction(event, callback);
};
const park = (event: ParkAction, callback: TCallback) => {
  return parkHooks.onParkAction(event, callback);
};

export {
  subscribe,
  landscape,
  scenery,
  scenarioEditing,
  parkChange,
  ride,
  guest,
  staff,
  network,
  other,
  park,
};

const eventIsInSection = (event: ExtendedActionType, section: readonly string[]) => {
  return section.indexOf(event) !== -1;
};
