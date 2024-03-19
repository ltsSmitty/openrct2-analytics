type HookAction =
  | LandscapeAction
  | SceneryAction
  | ScenarioEditingAction
  | ParkChangeAction
  | RideAction
  | GuestAction
  | StaffAction
  | NetworkAction
  | OtherAction
  | ParkAction;

type LandscapeAction = ActionType &
  (
    | "landbuyrights"
    | "landlower"
    | "landraise"
    | "landsetheight"
    | "landsetrights"
    | "landsmooth"
    | "surfacesetstyle"
    | "tilemodify"
    | "wallplace"
    | "wallremove"
    | "wallsetcolour"
    | "waterlower"
    | "waterraise"
    | "watersetheight"
  );

type SceneryAction = ActionType &
  (
    | "bannerplace"
    | "bannerremove"
    | "bannersetcolour"
    | "bannersetname"
    | "bannersetstyle"
    | "clearscenery"
    | "footpathadditionplace"
    | "footpathadditionremove"
    | "footpathplace"
    | "footpathlayoutplace"
    | "footpathremove"
    | "largesceneryplace"
    | "largesceneryremove"
    | "largescenerysetcolour"
    | "smallsceneryplace"
    | "smallsceneryremove"
    | "signsetname"
    | "signsetstyle"
  );

type ScenarioEditingAction =
  | "mapchanged_scenarioEditor"
  | "mapchanged_trackDesigner"
  | "mapchanged_trackManager"
  // unsure which is correct
  | "changemapsize"
  | "mapchangesize"
  | "climateset"
  | "parkentranceplace"
  | "parkentranceremove"
  | "peepspawnplace"
  | "scenariosetsetting";

type ParkChangeAction =
  | "loadorquit"
  | "mapchanged_titleScreen"
  | "mapchanged_inGame"
  | "mapsaved";

type RideAction =
  | "mazeplacetrack"
  | "mazesettrack"
  | "ridecreate"
  | "ridedemolish"
  | "rideentranceexitplace"
  | "rideentranceexitremove"
  | "ridefreezerating"
  | "ride.ratings.calculate"
  | "ridesetappearance"
  | "ridesetcolourscheme"
  | "ridesetname"
  | "ridesetprice"
  | "ridesetsetting"
  | "ridesetstatus"
  | "ridesetvehicle"
  | "stallcreate"
  | "stalldemolish"
  | "stallsetname"
  | "stallsetprice"
  | "stallsetsetting"
  | "stallopen"
  | "stallclose"
  | "trackdesign"
  | "trackplace"
  | "trackremove"
  | "tracksetbrakespeed"
  | "vehicle.crash";

type GuestAction =
  | "guestsetflags"
  | "guestsetname"
  | "peeppickup"
  | "peepsetdown"
  | "guest.generated";

type StaffAction =
  | "stafffire"
  | "staffhire"
  | "staffsetcolour"
  | "staffsetcostume"
  | "staffsetname"
  | "staffsetorders"
  | "staffsetpatrolarea";

type NetworkAction =
  | "networkmodifygroup"
  | "network.chat"
  | "network.action"
  | "network.join"
  | "network.leave"
  | "playerkick"
  | "playersetgroup";

type OtherAction =
  | "balloonpress"
  | "cheatset"
  | "gamesetspeed"
  | "pausetoggle"
  // can't figure out how to hook into this one
  | "tilemodify";

type ParkAction =
  | "parkmarketing"
  | "parksetdate"
  | "parksetentrancefee"
  | "parksetloan"
  | "parksetname"
  | "parksetparameter"
  | "parksetresearchfunding";

type TCallback = (args: GameActionEventArgs<object> | undefined) => void;
