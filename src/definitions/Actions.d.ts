type SceneryAction = ActionType &
  (
    | "clearscenery"
    | "landlower"
    | "landraise"
    | "landsetheight"
    | "landsetrights"
    | "landsmooth"
    | "largesceneryplace"
    | "largesceneryremove"
    | "largescenerysetcolour"
    | "smallsceneryplace"
    | "smallsceneryremove"
    | "surfacesetstyle"
    | "tilemodify"
    | "wallplace"
    | "wallremove"
    | "wallsetcolour"
    | "waterlower"
    | "waterraise"
    | "watersetheight"
  );

type TSceneryTypeMap<S extends SceneryAction, T extends object> = {
  [key in S]: T;
};

interface ActionData<S extends ActionType, T extends object> {
  readonly action: S;
  readonly args: T;
}

interface SceneryTypeMap
  extends TSceneryTypeMap<SceneryAction, ActionData<SceneryAction, object>> {
  clearscenery: ActionData<"clearscenery", ClearSceneryArgs>;
  landlower: ActionData<"landlower", LandLowerArgs>;
  landraise: ActionData<"landraise", LandRaiseArgs>;
  landsetheight: ActionData<"landsetheight", LandSetHeightArgs>;
  landsetrights: ActionData<"landsetrights", LandSetRightsArgs>;
  landsmooth: ActionData<"landsmooth", LandSmoothArgs>;
  largesceneryplace: ActionData<"largesceneryplace", LargeSceneryPlaceArgs>;
  largesceneryremove: ActionData<"largesceneryremove", LargeSceneryRemoveArgs>;
  largescenerysetcolour: ActionData<
    "largescenerysetcolour",
    LargeScenerySetColourArgs
  >;
  smallsceneryplace: ActionData<"smallsceneryplace", SmallSceneryPlaceArgs>;
  smallsceneryremove: ActionData<"smallsceneryremove", SmallSceneryRemoveArgs>;
  surfacesetstyle: ActionData<"surfacesetstyle", SurfaceSetStyleArgs>;
  tilemodify: ActionData<"tilemodify", TileModifyArgs>;
  wallplace: ActionData<"wallplace", WallPlaceArgs>;
  wallremove: ActionData<"wallremove", WallRemoveArgs>;
  wallsetcolour: ActionData<"wallsetcolour", WallSetColourArgs>;
  waterlower: ActionData<"waterlower", WaterLowerArgs>;
  waterraise: ActionData<"waterraise", WaterRaiseArgs>;
  watersetheight: ActionData<"watersetheight", WaterSetHeightArgs>;
}
