interface ActionData<
  S extends ActionType,
  T extends object,
  TMainExpenditureType extends ExpenditureType | undefined = undefined,
  TExpenditureType extends ExpenditureType | undefined = TMainExpenditureType
> {
  readonly action: S;
  readonly args: T;
  readonly player: number;
  readonly type: number;
  readonly isClientOnly: boolean;
  readonly result: GameActionResult & {
    readonly expenditureType?: TExpenditureType;
  };
}

interface LandscapingTypeMap
  extends Record<
    LandscapeAction,
    ActionData<
      LandscapeAction,
      object,
      "landscaping",
      ExpenditureType | undefined
    >
  > {
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
  signsetname: ActionData<"signsetname", SignSetNameArgs, undefined>;
  signsetstyle: ActionData<"signsetstyle", SignSetStyleArgs, undefined>;
  surfacesetstyle: ActionData<"surfacesetstyle", SurfaceSetStyleArgs>;
  tilemodify: ActionData<"tilemodify", TileModifyArgs>;
  wallplace: ActionData<"wallplace", WallPlaceArgs>;
  wallremove: ActionData<"wallremove", WallRemoveArgs>;
  wallsetcolour: ActionData<"wallsetcolour", WallSetColourArgs>;
  waterlower: ActionData<"waterlower", WaterLowerArgs>;
  waterraise: ActionData<"waterraise", WaterRaiseArgs>;
  watersetheight: ActionData<"watersetheight", WaterSetHeightArgs>;
}
