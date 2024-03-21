import { actions, ActionTypes } from "openrct2-extended-hooks";
import { store, WritableStore } from "openrct2-flexui";
import { config } from "./config";

type SubscriptionStore = Record<ActionTypes.ExtendedActionType, WritableStore<boolean>>;
type FlatSubscriptionStore = Record<ActionTypes.ExtendedActionType, boolean>;

export const createSubscriptionStore = (flatStore?: FlatSubscriptionStore) => {
  // @ts-ignore
  const subscriptions: SubscriptionStore = {};
  actions.hookActions.forEach((action) => {
    subscriptions[action] = store<boolean>(false);
  });

  if (flatStore) {
    Object.keys(flatStore).forEach((k) => {
      const key = k as keyof FlatSubscriptionStore;
      subscriptions[key].set(flatStore[key]);
    });
  }
};

export const flattenSubscriptionStore = (
  subscriptions: SubscriptionStore
): FlatSubscriptionStore => {
  // @ts-ignore
  const flattenedSubscriptions: Record<ActionTypes.ExtendedActionType, boolean> = {};
  Object.keys(subscriptions).forEach((k) => {
    const key = k as keyof SubscriptionStore;
    flattenedSubscriptions[key] = subscriptions[key].get();
  });
  return flattenedSubscriptions;
};

const parkStatKey = `${config.pluginName}.subscriptions.values`;

export const loadSubscriptionValues = () => {
  const flatValues = context.sharedStorage.get(parkStatKey, {}) as FlatSubscriptionStore;
  return createSubscriptionStore(flatValues);
};

export const saveSubscriptionValues = (subscriptions: SubscriptionStore) => {
  const flatValues = flattenSubscriptionStore(subscriptions);
  context.sharedStorage.set(parkStatKey, flatValues);
};
