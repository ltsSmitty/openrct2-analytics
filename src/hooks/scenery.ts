export const onChangeScenery = <T extends LandscapeAction>(
  sceneryAction: T,
  callback: (args: LandscapingTypeMap[T]) => void
) => {
  context.subscribe("action.execute", (d) => {
    const thisType = getType(sceneryAction);
    const data = d as unknown as typeof thisType;
    if (data.action === sceneryAction) {
      callback(data);
    }
  });
};

// Function to get the type based on a key
function getType<T extends keyof LandscapingTypeMap>(
  key: T
): LandscapingTypeMap[T] {
  return {} as LandscapingTypeMap[typeof key];
}
