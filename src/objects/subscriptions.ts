import { actions, ActionTypes, hooks } from "openrct2-extended-hooks";
import { store, WritableStore } from "openrct2-flexui";
import { config } from "../config";
import { callbackMap } from "../callbacks";

type TSubscriptionStore = Record<ActionTypes.ExtendedActionType, WritableStore<boolean>>;
type TFlatSubscriptionStore = Record<ActionTypes.ExtendedActionType, boolean>;
type IDisposableSubscriptionMap = Record<ActionTypes.ExtendedActionType, IDisposable>;

const parkStatKey = `${config.pluginName}.subscriptions.values`;

class SubscriptionStore {
  // @ts-ignore
  subscriptions: TSubscriptionStore = {};
  // @ts-ignore
  private disposableSubscriptions: IDisposableSubscriptionMap = {};

  constructor() {
    this.iniatializeSubscriptionStore();
  }

  iniatializeSubscriptionStore() {
    this.load();
    hooks.subscribe("loadorquit", () => {
      this.save();
    });
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
            callbackMap[key](data as any);
          });
        } else {
          this.disposableSubscriptions[key].dispose();
        }
        this.save();
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

  load() {
    const flatValues = context.sharedStorage.get(parkStatKey, {}) as TFlatSubscriptionStore;
    flatValues ? this.createSubscriptionStore(flatValues) : this.createSubscriptionStore();
  }

  save() {
    const flatValues = this.flatten(this.subscriptions);
    return context.sharedStorage.set(parkStatKey, flatValues);
  }
}

export const subscriptions = new SubscriptionStore().subscriptions;
