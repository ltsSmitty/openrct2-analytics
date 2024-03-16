export const onChangeScenery = <T extends SceneryAction>(
  sceneryAction: T,
  callback: (args: SceneryTypeMap[T]) => void
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
function getType<T extends keyof SceneryTypeMap>(key: T): SceneryTypeMap[T] {
  return {} as SceneryTypeMap[typeof key];
}
