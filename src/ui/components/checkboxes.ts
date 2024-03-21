import { actions } from "openrct2-extended-hooks";
import { analyticsToggle } from "./analyticsToggle";

const landscaping = actions.landscapeActions.map((action) => {
  return analyticsToggle(action);
});

const ride = actions.rideActions.map((action) => {
  return analyticsToggle(action);
});

const park = actions.parkActions.map((action) => {
  return analyticsToggle(action);
});

const guest = actions.guestActions.map((action) => {
  return analyticsToggle(action);
});

const network = actions.networkActions.map((action) => {
  return analyticsToggle(action);
});

const parkChange = actions.parkChangeActions.map((action) => {
  return analyticsToggle(action);
});

const staff = actions.staffActions.map((action) => {
  return analyticsToggle(action);
});

const other = actions.otherActions.map((action) => {
  return analyticsToggle(action);
});

const scenarioEditing = actions.scenarioEditingActions.map((action) => {
  return analyticsToggle(action);
});

const scenery = actions.sceneryActions.map((action) => {
  return analyticsToggle(action);
});

export const checkboxes = {
  landscaping,
  ride,
  park,
  guest,
  network,
  parkChange,
  staff,
  other,
  scenarioEditing,
  scenery,
};
