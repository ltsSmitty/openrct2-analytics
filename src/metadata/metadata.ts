import { pluginVersion } from "../config";

function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = +("000" + firstPart.toString(36)).slice(-3);
  secondPart = +("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

function getMetadata(pluginName: string) {
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
        eventPluginSource: pluginName,
      },
      network: {
        networkMode: network.mode,
        // add potentially other network info, like player id, etc.
      },
      mode: context.mode,
      // language could be nice, but isn't exposed
    },
    messageID: generateUID(),
    timestamp: new Date().toISOString(),
  };
}

export { getMetadata };
