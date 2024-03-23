import { dropdown, groupbox, label, tab, vertical, compute, WritableStore } from "openrct2-flexui";
import { TSubscriptionStore, subs } from "../../objects/subscriptions";
import { standardSelection } from "../../standardTrackingSelection";
import { areAllValsFalse, areObjectValuesEqual } from "../../utilities/compareObjectValues";

const statIncreaseIcon: ImageAnimation = {
  frameBase: 5367,
  frameCount: 8,
  frameDuration: 8,
};

const subscriptionKeys = Object.keys(subs.subscriptions).map((k) => {
  const key = k as keyof TSubscriptionStore;
  return key;
});

const stores = subscriptionKeys.map((key) => subs.subscriptions[key]);
// compute actually supports as many stores as you want, but the typescript types are limited to 5
// so this isn't a relevant error, especially since I don't need to access the values of the stores
// @ts-ignore
const dropDownIndex = compute(...stores, (_firstStoreValue) => {
  const values = subs.flat;
  if (areAllValsFalse(values)) {
    return 0;
  } else if (areObjectValuesEqual(values, standardSelection)) {
    return 1;
  }
  return 2;
}) as WritableStore<number>;

export const mainTabContent = () => {
  return tab({
    image: statIncreaseIcon,
    content: [
      groupbox({
        text: "Analytics",
        content: [
          vertical({
            content: [
              label({ text: "Start with a tracking preset or customize your own" }),
              dropdown({
                items: ["None", "Standard", "Custom"],
                selectedIndex: compute(dropDownIndex, (index) => index),
                onChange: (index) => {
                  if (index === 0) {
                    subs.resetValuesToZero();
                  } else if (index === 1) {
                    subs.set(standardSelection);
                  } else {
                    // do the custom thing
                  }
                },
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
