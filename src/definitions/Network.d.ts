type NetworkAction = ActionType &
  (
    | "networkmodifygroup"
    | "network.chat"
    | "network.action"
    | "network.join"
    | "network.leave"
  );

type OtherAction = ActionType &
  ("map.change" | "map.changed" | "map.save" | "action.location" | "cheatset");

type ScenarioAction = ActionType &
  ("peepspawnplace" | "scenario" | "map.change" | "map.changed" | "map.save");
