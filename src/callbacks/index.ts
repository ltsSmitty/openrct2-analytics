import { analytics } from "openrct2-analytics-sdk";
import { ActionTypes } from "openrct2-extended-hooks";
import { EventName } from "../eventNames";

type CallbackMap = Record<ActionTypes.ExtendedActionType, (args: GameActionEventArgs) => void>;

const trackEvent = (title: EventName, data?: GameActionEventArgs) => {
  console.log("Tracking event: ", title, data);
  analytics.track({
    name: title,
    properties: data,
  });
};

export const callbackMap: CallbackMap = {
  balloonpress: (args) => {
    trackEvent("Balloon pressed", args);
  },
  bannerplace: function (args): void {
    trackEvent("Banner placed", args);
  },
  bannerremove: function (args): void {
    trackEvent("Banner removed", args);
  },
  bannersetcolour: function (args): void {
    trackEvent("Banner colour set", args);
  },
  bannersetname: function (args): void {
    trackEvent("Banner name set", args);
  },
  bannersetstyle: function (args): void {
    trackEvent("Banner style set", args);
  },
  cheatset: function (args): void {
    trackEvent("Cheat set", args);
  },
  clearscenery: function (args): void {
    trackEvent("Scenery cleared", args);
  },
  climateset: function (args): void {
    trackEvent("Climate set", args);
  },
  footpathadditionplace: function (args): void {
    trackEvent("Footpath addition placed", args);
  },
  footpathadditionremove: function (args): void {
    trackEvent("Footpath addition removed", args);
  },
  footpathplace: function (args): void {
    trackEvent("Footpath placed", args);
  },
  footpathlayoutplace: function (args): void {
    trackEvent("Footpath layout placed", args);
  },
  footpathremove: function (args): void {
    trackEvent("Footpath removed", args);
  },
  gamesetspeed: function (args): void {
    trackEvent("Game speed set", args);
  },
  guestsetflags: function (args): void {
    trackEvent("Guest flags set", args);
  },
  guestsetname: function (args): void {
    trackEvent("Guest name set", args);
  },
  landbuyrights: function (args): void {
    trackEvent("Land rights purchased", args);
  },
  landlower: function (args): void {
    trackEvent("Land lowered", args);
  },
  landraise: function (args): void {
    trackEvent("Land raised", args);
  },
  landsetheight: function (args): void {
    trackEvent("Land height set", args);
  },
  landsetrights: function (args): void {
    trackEvent("Land rights set", args);
  },
  landsmooth: function (args): void {
    trackEvent("Land smoothed", args);
  },
  largesceneryplace: function (args): void {
    trackEvent("Large scenery placed", args);
  },
  largesceneryremove: function (args): void {
    trackEvent("Large scenery removed", args);
  },
  largescenerysetcolour: function (args): void {
    trackEvent("Large scenery colour set", args);
  },
  loadorquit: function (args): void {
    trackEvent("Load or quit", args);
    analytics.flush();
  },
  mapchangesize: function (_args): void {
    trackEvent("Map size changed");
  },
  mazeplacetrack: function (args): void {
    trackEvent("Maze track placed", args);
  },
  mazesettrack: function (args): void {
    trackEvent("Maze track set", args);
  },
  networkmodifygroup: function (args): void {
    trackEvent("Network group modified", args);
  },
  parkentranceplace: function (args): void {
    trackEvent("Park entrance placed", args);
  },
  parkentranceremove: function (args): void {
    trackEvent("Park entrance removed", args);
  },
  parkmarketing: function (args): void {
    trackEvent("Park marketing purchased", args);
  },
  parksetdate: function (args): void {
    trackEvent("Park date set", args);
  },
  parksetentrancefee: function (args): void {
    trackEvent("Park entrance fee set", args);
  },
  parksetloan: function (args): void {
    trackEvent("Park loan set", args);
  },
  parksetname: function (args): void {
    trackEvent("Park name set", args);
  },
  parksetparameter: function (args): void {
    trackEvent("Park parameter set", args);
  },
  parksetresearchfunding: function (args): void {
    trackEvent("Park research funding set", args);
  },
  pausetoggle: function (args): void {
    trackEvent("Pause toggle", args);
  },
  peeppickup: function (args): void {
    trackEvent("Peep picked up", args);
  },
  peepspawnplace: function (args): void {
    trackEvent("Peep spawn placed", args);
  },
  playerkick: function (args): void {
    trackEvent("Player kicked", args);
  },
  playersetgroup: function (args): void {
    trackEvent("Player group set", args);
  },
  ridecreate: function (args): void {
    trackEvent("Ride created", args);
  },
  ridedemolish: function (args): void {
    trackEvent("Ride demolished", args);
  },
  rideentranceexitplace: function (args): void {
    trackEvent("Ride entrance/exit placed", args);
  },
  rideentranceexitremove: function (args): void {
    trackEvent("Ride entrance/exit removed", args);
  },
  ridefreezerating: function (args): void {
    trackEvent("Ride rating frozen", args);
  },
  ridesetappearance: function (args): void {
    trackEvent("Ride appearance set", args);
  },
  ridesetcolourscheme: function (args): void {
    trackEvent("Ride colour scheme set", args);
  },
  ridesetname: function (args): void {
    trackEvent("Ride name set", args);
  },
  ridesetprice: function (args): void {
    trackEvent("Ride price set", args);
  },
  ridesetsetting: function (args): void {
    trackEvent("Ride setting set", args);
  },
  ridesetstatus: function (args): void {
    trackEvent("Ride status set", args);
  },
  ridesetvehicle: function (args): void {
    trackEvent("Ride vehicle set", args);
  },
  scenariosetsetting: function (args): void {
    trackEvent("Scenario setting set", args);
  },
  signsetname: function (args): void {
    trackEvent("Sign name set", args);
  },
  signsetstyle: function (args): void {
    trackEvent("Sign style set", args);
  },
  smallsceneryplace: function (args): void {
    trackEvent("Small scenery placed", args);
  },
  smallsceneryremove: function (args): void {
    trackEvent("Small scenery removed", args);
  },
  smallscenerysetcolour: function (args): void {
    trackEvent("Small scenery colour set", args);
  },
  stafffire: function (args): void {
    trackEvent("Staff fired", args);
  },
  staffhire: function (args): void {
    trackEvent("Staff hired", args);
  },
  staffsetcolour: function (args): void {
    trackEvent("Staff colour set", args);
  },
  staffsetcostume: function (args): void {
    trackEvent("Staff costume set", args);
  },
  staffsetname: function (args): void {
    trackEvent("Staff name set", args);
  },
  staffsetorders: function (args): void {
    trackEvent("Staff orders set", args);
  },
  staffsetpatrolarea: function (args): void {
    trackEvent("Staff patrol area set", args);
  },
  surfacesetstyle: function (args): void {
    trackEvent("Surface style set", args);
  },
  tilemodify: function (args): void {
    trackEvent("Tile modified", args);
  },
  trackplace: function (args): void {
    trackEvent("Track placed", args);
  },
  trackremove: function (args): void {
    trackEvent("Track removed", args);
  },
  tracksetbrakespeed: function (args): void {
    trackEvent("Track brake speed set", args);
  },
  wallplace: function (args): void {
    trackEvent("Wall placed", args);
  },
  wallremove: function (args): void {
    trackEvent("Wall removed", args);
  },
  wallsetcolour: function (args): void {
    trackEvent("Wall colour set", args);
  },
  waterlower: function (args): void {
    trackEvent("Water lowered", args);
  },
  waterraise: function (args): void {
    trackEvent("Water raised", args);
  },
  watersetheight: function (args): void {
    trackEvent("Water height set", args);
  },
  mapchanged_scenarioEditor: function (_args): void {
    trackEvent("Map changed in scenario editor");
  },
  mapchanged_trackDesigner: function (_args): void {
    trackEvent("Map changed in track designer");
  },
  mapchanged_trackManager: function (_args): void {
    trackEvent("Map changed in track manager");
  },
  changemapsize: function (_args): void {
    trackEvent("Map size changed");
  },
  mapchanged_titleScreen: function (_args): void {
    trackEvent("Map changed in title screen");
  },
  mapchanged_inGame: function (args): void {
    trackEvent("Map changed in game", args);
  },
  mapsaved: function (args): void {
    trackEvent("Map saved", args);
  },
  "ride.ratings.calculate": function (args): void {
    trackEvent("Ride ratings calculated", args);
  },
  stallcreate: function (args): void {
    trackEvent("Stall created", args);
  },
  stalldemolish: function (args): void {
    trackEvent("Stall demolished", args);
  },
  stallsetname: function (args): void {
    trackEvent("Stall name set", args);
  },
  stallsetprice: function (args): void {
    trackEvent("Stall price set", args);
  },
  stallsetsetting: function (args): void {
    trackEvent("Stall setting set", args);
  },
  "vehicle.crash": function (args): void {
    trackEvent("Vehicle crashed", args);
  },
  peepsetdown: function (args): void {
    trackEvent("Peep set down", args);
  },
  "guest.generated": function (args): void {
    trackEvent("Guest generated", args);
  },
  "network.chat": function (args): void {
    trackEvent("Network chat", args);
  },
  "network.action": function (args): void {
    trackEvent("Network action", args);
  },
  "network.join": function (args): void {
    trackEvent("Network joined", args);
  },
  "network.leave": function (args): void {
    trackEvent("Network left", args);
  },
};
