import { analytics } from "openrct2-analytics-sdk";
import {
  WritableStore,
  button,
  groupbox,
  horizontal,
  store,
  tab,
  vertical,
} from "openrct2-flexui";
import { analysis } from "../../objects/analysis";
import { filterByEvent } from "../components/filterUI/eventNameFilter";
import { filterByDay } from "../components/filterUI/dateFilter";
import { getAllNestedKeys } from "../../utilities/getNestedValues";
import { filterByProp } from "../components/filterUI/propFilter";

type FilterPropStore = {
  toggles: {
    byEventName: WritableStore<boolean>;
    byDate: WritableStore<boolean>;
  };
  // should this be an event or an id?
  selectedEventIndex: WritableStore<number>;
  date: {
    day: WritableStore<number>;
    month: WritableStore<number>;
    year: WritableStore<number>;
  };
  loadedEventNames: WritableStore<string[]>;
  loadedEventProps: WritableStore<string[]>;
};

export const model: FilterPropStore = {
  toggles: {
    byEventName: store(false),
    byDate: store(false),
  },
  selectedEventIndex: store(-1),
  date: {
    day: store(1),
    month: store(1),
    year: store(2024),
  },
  loadedEventNames: store([]),
  loadedEventProps: store([]),
};

export const analysisTab = () => {
  return tab({
    width: 500,
    height: 300,
    image: {
      frameBase: 5245,
      frameCount: 8,
      frameDuration: 8,
    },
    onOpen: reloadData,
    content: [
      groupbox({
        text: "Analysis",
        content: [
          vertical({
            content: [
              horizontal({
                content: [
                  button({
                    text: "Reload data",
                    onClick: () => {
                      reloadData();
                    },
                  }),
                ],
              }),
              // filter toggles
              groupbox({
                text: "Filters",
                content: [
                  vertical({
                    content: [
                      // event type
                      filterByEvent(),
                      //date
                      filterByDay(),
                      // by prop
                      filterByProp(),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const reloadData = () => {
  analytics.flush();
  analysis.loadFromStorage();
  model.loadedEventNames.set(Object.keys(analysis.eventData).sort((a, b) => a.localeCompare(b)));
  model.selectedEventIndex.subscribe((index) => {
    // get the 0th index of the array and grab the props to display
    const key = model.loadedEventNames
      .get()
      .filter(
        (v) => v === model.loadedEventNames.get()[index]
      )[0] as keyof typeof analysis.eventData;
    const exampleEvent = analysis.eventData[key]?.[0];
    const eventKeys = getAllNestedKeys(exampleEvent ?? []);
    console.log(`eventValues: ${JSON.stringify(eventKeys, null, 2)}`);
    model.loadedEventProps.set(eventKeys);
    console.log(`selectedEventIndex: ${index}`);
  });
  model.selectedEventIndex.set(0);
  // set the selected index to -1 and then to the real current index to trigger
};
