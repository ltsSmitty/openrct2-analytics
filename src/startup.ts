function onClickMenuItem() {
  // Write code here that should happen when the player clicks the menu item under the map icon.

  console.log(
    `Save file: ${scenario.filename}, Scenario name: ${scenario.name}, park name ${park.name}`
  );
}

export function startup() {
  // Write code here that should happen on startup of the plugin.
  context.subscribe("map.save", () => {
    console.log("Map saved");
    `Save file: ${scenario.filename}, Scenario name: ${scenario.name}, park name ${park.name}`;
  });

  context.subscribe("map.changed", () => {
    console.log("Map changed");
    `Save file: ${scenario.filename}, Scenario name: ${scenario.name}, park name ${park.name}`;
  });

  context.subscribe("map.change", () => {
    console.log("Map change");
    `Save file: ${scenario.filename}, Scenario name: ${scenario.name}, park name ${park.name}`;
  });

  // Register a menu item under the map icon:
  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Analytics", () => onClickMenuItem());
  }
}
