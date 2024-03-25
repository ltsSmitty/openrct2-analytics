import { actions, ActionTypes, hooks } from "openrct2-extended-hooks";
import { store, WritableStore } from "openrct2-flexui";
import { config } from "../config";
import { callbackMap } from "../callbacks";

export type TSubscriptionStore = Record<ActionTypes.ExtendedActionType, WritableStore<boolean>>;
export type TFlatSubscriptionStore = Record<ActionTypes.ExtendedActionType, boolean>;
type IDisposableSubscriptionMap = Record<ActionTypes.ExtendedActionType, IDisposable>;

const parkStatKey = `${config.pluginName}.subscriptions.values` as const;

class SubscriptionStore {
  // @ts-ignore
  subscriptions: TSubscriptionStore = {};
  // @ts-ignore
  private disposableSubscriptions: IDisposableSubscriptionMap = {};

  constructor() {
    this.load();
    hooks.subscribe("loadorquit", () => {
      this.save();
    });
  }

  load() {
    const flatValuesJSONString = context.sharedStorage.get(parkStatKey, "");
    const flatValues = JSON.parse(flatValuesJSONString) as TFlatSubscriptionStore;
    console.log("Loaded subscription values", flatValues);
    flatValues ? this.createSubscriptionStore(flatValues) : this.createSubscriptionStore();
  }

  save() {
    console.log("Saving subscription values");
    park.postMessage("Saving subscription values");
    const flatValues = this.flatten(this.subscriptions);
    context.sharedStorage.set(parkStatKey, JSON.stringify(flatValues));
  }

  createSubscriptionStore(flatStore?: TFlatSubscriptionStore) {
    // initialize subscriptions with falsey values
    actions.hookActions.forEach((action) => {
      // console.log(`Creating subscription for ${action}`);
      this.subscriptions[action] = store<boolean>(false);
    });

    // set the callbacks & IDisposables for each key subscriptions
    Object.keys(this.subscriptions).forEach((k) => {
      const key = k as keyof TFlatSubscriptionStore;
      this.subscriptions[key].subscribe((v) => {
        console.log(`Set subscription setting for ${key} to ${v}`);
        if (v) {
          this.disposableSubscriptions[key] = hooks.subscribe(key, (data) => {
            const eventAction = data?.action as typeof key;
            if (eventAction !== key) {
              console.log(`Action/key mismatch: ${eventAction} !== ${key}`);
            }
            callbackMap[eventAction](data ?? ({} as any));
          });
        } else {
          this.disposableSubscriptions[key].dispose();
        }
      });
    });

    // if flatStore is provided, set the subscriptions to the values in the flatStore
    if (flatStore) {
      Object.keys(flatStore).forEach((k) => {
        // console.log(`Setting subscription for ${k} from flatstore`);
        const key = k as keyof TFlatSubscriptionStore;
        this.subscriptions[key].set(flatStore[key]);
      });
    }
    this.save();
    return this.subscriptions;
  }

  flatten(subscriptions: TSubscriptionStore): TFlatSubscriptionStore {
    // @ts-ignore
    const flattenedSubscriptions: Record<ActionTypes.ExtendedActionType, boolean> = {};
    Object.keys(subscriptions).forEach((k) => {
      const key = k as keyof TSubscriptionStore;
      flattenedSubscriptions[key] = subscriptions[key].get();
    });
    return flattenedSubscriptions;
  }

  get flat() {
    return this.flatten(this.subscriptions);
  }

  resetValuesToZero() {
    Object.keys(this.subscriptions).forEach((k) => {
      const key = k as keyof TSubscriptionStore;
      this.subscriptions[key].set(false);
    });
  }

  set(values: TFlatSubscriptionStore) {
    Object.keys(values).forEach((k) => {
      const key = k as keyof TFlatSubscriptionStore;
      this.subscriptions[key].set(values[key]);
    });
  }
}

export const subs = new SubscriptionStore();
