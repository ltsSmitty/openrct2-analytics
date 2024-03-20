const LandscapeActions = [
  "landbuyrights",
  "landlower",
  "landraise",
  "landsetheight",
  "landsetrights",
  "landsmooth",
  "surfacesetstyle",
  "tilemodify",
  "wallplace",
  "wallremove",
  "wallsetcolour",
  "waterlower",
  "waterraise",
  "watersetheight",
] as const;

type LandscapeAction = (typeof LandscapeActions)[number];

const SceneryActions = [
  "bannerplace",
  "bannerremove",
  "bannersetcolour",
  "bannersetname",
  "bannersetstyle",
  "clearscenery",
  "footpathadditionplace",
  "footpathadditionremove",
  "footpathplace",
  "footpathlayoutplace",
  "footpathremove",
  "largesceneryplace",
  "largesceneryremove",
  "largescenerysetcolour",
  "smallsceneryplace",
  "smallsceneryremove",
  "signsetname",
  "signsetstyle",
] as const;

type SceneryAction = (typeof SceneryActions)[number];

const ScenarioEditingActions = [
  "mapchanged_scenarioEditor",
  "mapchanged_trackDesigner",
  "mapchanged_trackManager",
  "changemapsize", // unsure which of this is correct
  "mapchangesize",
  "climateset",
] as const;

type ScenarioEditingAction = (typeof ScenarioEditingActions)[number];

const ParkChangeActions = [
  "loadorquit",
  "mapchanged_titleScreen",
  "mapchanged_inGame",
  "mapsaved",
] as const;

type ParkChangeAction = (typeof ParkChangeActions)[number];

const RideActions = [
  "mazeplacetrack",
  "mazesettrack",
  "ridecreate",
  "ridedemolish",
  "rideentranceexitplace",
  "rideentranceexitremove",
  "ridefreezerating",
  "ride.ratings.calculate",
  "ridesetappearance",
  "ridesetcolourscheme",
  "ridesetname",
  "ridesetprice",
  "ridesetsetting",
  "ridesetstatus",
  "ridesetvehicle",
  "stallcreate",
  "stalldemolish",
  "stallsetname",
  "stallsetprice",
  "stallsetsetting",
  "stallopen",
  "stallclose",
  "trackplace",
  "trackremove",
  "tracksetbrakespeed",
  "vehicle.crash",
] as const;

type RideAction = (typeof RideActions)[number];

const GuestActions = [
  "guestsetflags",
  "guestsetname",
  "peeppickup",
  "peepsetdown",
  "guest.generated",
] as const;

type GuestAction = (typeof GuestActions)[number];

const StaffActions = [
  "stafffire",
  "staffhire",
  "staffsetcolour",
  "staffsetcostume",
  "staffsetname",
  "staffsetorders",
  "staffsetpatrolarea",
] as const;

type StaffAction = (typeof StaffActions)[number];

const NetworkActions = [
  "networkmodifygroup",
  "network.chat",
  "network.action",
  "network.join",
  "network.leave",
  "playerkick",
  "playersetgroup",
] as const;

type NetworkAction = (typeof NetworkActions)[number];

const OtherActions = ["balloonpress", "cheatset", "gamesetspeed", "pausetoggle"] as const;

const ParkActions = [
  "parkmarketing",
  "parksetdate",
  "parksetentrancefee",
  "parksetloan",
  "parksetname",
  "parksetparameter",
  "parksetresearchfunding",
] as const;

type ParkAction = (typeof ParkActions)[number];

const HookActions = [
  ...LandscapeActions,
  ...SceneryActions,
  ...ScenarioEditingActions,
  ...ParkChangeActions,
  ...RideActions,
  ...GuestActions,
  ...StaffActions,
  ...NetworkActions,
  ...OtherActions,
  ...ParkActions,
] as const;

type HookAction = (typeof HookActions)[number];
