import * as guest from "./guest";
import * as scenarioEditing from "./scenarioEditing";
import * as parkChange from "./parkChange";
import * as scenery from "./scenery";
import * as landscape from "./landscape";
import * as staff from "./staff";
import * as network from "./network";
import * as park from "./park";
import * as other from "./other";
import * as ride from "./ride";
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

export const subscribe = (event: ExtendedActionType, callback: TCallback) => {
  if (event in landscapeActions) {
    landscape.onChangeLandscape(event as LandscapeAction, callback);
  } else if (event in sceneryActions) {
    scenery.onChangeScenery(event as SceneryAction, callback);
  } else if (event in scenarioEditingActions) {
    scenarioEditing.onScenarioEdit(event as ScenarioEditingAction, callback);
  } else if (event in parkChangeActions) {
    parkChange.onParkChange(event as ParkChangeAction, callback);
  } else if (event in rideActions) {
    ride.onRideChange(event as RideAction, callback);
  } else if (event in guestActions) {
    guest.onGuestEvent(event as GuestAction, callback);
  } else if (event in staffActions) {
    staff.onStaffAction(event as StaffAction, callback);
  } else if (event in networkActions) {
    network.onNetworkChange(event as NetworkAction, callback);
  } else if (event in otherActions) {
    other.onOtherAction(event as OtherAction, callback);
  } else if (event in parkActions) {
    park.onParkAction(event as ParkAction, callback);
  } else {
    throw new Error(`Event ${event} not found`);
  }
};
