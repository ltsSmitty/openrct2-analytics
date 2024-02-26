import { pluginVersion } from "../config";
import { v4 as uuidv4 } from "uuid";

function getMetadata() {
  // todo id
  return {
    context: {
      park: {
        scenario: {
          fileName: scenario.filename,
          scenarioName: scenario.name,
          name: park.name,
        },
        inGameDate: {
          year: date.year,
          month: date.month,
          day: date.day,
          ticksElapsed: date.ticksElapsed,
          monthProgress: date.monthProgress,
        },
      },
      library: {
        pluginVersion,
        apiVersion: context.apiVersion,
      },
      network: {
        networkMode: network.mode,
        // add potentially other network info, like player id, etc.
      },
      // language could be nice, but isn't exposed
    },
    messageID: uuidv4(),
    timestamp: new Date().toISOString(),
  };
}

export { getMetadata };
