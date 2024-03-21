import { analytics } from "openrct2-analytics-sdk";
import { ExtendedActionType } from "../hooks/actions";

type CallbackMap = Record<ExtendedActionType, (args: GameActionEventArgs) => void>;

const trackEvent = (title: string, data: GameActionEventArgs) => {
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
    trackEvent("Footpath placde", args);
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
  },
  mapchangesize: function (args): void {
    trackEvent("Map size changed", args);
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
    trackEvent("Park marketing", args);
  },
  parksetdate: function (args): void {
    trackEvent("Park set date", args);
  },
  parksetentrancefee: function (args): void {
    trackEvent("Park set entrance fee", args);
  },
  parksetloan: function (args): void {
    trackEvent("Park set loan", args);
  },
  parksetname: function (args): void {
    trackEvent("Park set name", args);
  },
  parksetparameter: function (args): void {
    trackEvent("Park set parameter", args);
  },
  parksetresearchfunding: function (args): void {
    trackEvent("Park set research funding", args);
  },
  pausetoggle: function (args): void {
    trackEvent("Pause toggle", args);
  },
  peeppickup: function (args): void {
    trackEvent("Peep pickup", args);
  },
  peepspawnplace: function (args): void {
    trackEvent("Peep spawn place", args);
  },
  playerkick: function (args): void {
    trackEvent("Player kick", args);
  },
  playersetgroup: function (args): void {
    trackEvent("Player set group", args);
  },
  ridecreate: function (args): void {
    trackEvent("Ride create", args);
  },
  ridedemolish: function (args): void {
    trackEvent("Ride demolish", args);
  },
  rideentranceexitplace: function (args): void {
    trackEvent("Ride entrance exit place", args);
  },
  rideentranceexitremove: function (args): void {
    trackEvent("Ride entrance exit remove", args);
  },
  ridefreezerating: function (args): void {
    trackEvent("Ride freeze rating", args);
  },
  ridesetappearance: function (args): void {
    trackEvent("Ride set appearance", args);
  },
  ridesetcolourscheme: function (args): void {
    trackEvent("Ride set colour scheme", args);
  },
  ridesetname: function (args): void {
    trackEvent("Ride set name", args);
  },
  ridesetprice: function (args): void {
    trackEvent("Ride set price", args);
  },
  ridesetsetting: function (args): void {
    trackEvent("Ride set setting", args);
  },
  ridesetstatus: function (args): void {
    trackEvent("Ride set status", args);
  },
  ridesetvehicle: function (args): void {
    trackEvent("Ride set vehicle", args);
  },
  scenariosetsetting: function (args): void {
    trackEvent("Scenario set setting", args);
  },
  signsetname: function (args): void {
    trackEvent("Sign set name", args);
  },
  signsetstyle: function (args): void {
    trackEvent("Sign set style", args);
  },
  smallsceneryplace: function (args): void {
    trackEvent("Small scenery place", args);
  },
  smallsceneryremove: function (args): void {
    trackEvent("Small scenery remove", args);
  },
  smallscenerysetcolour: function (args): void {
    trackEvent("Small scenery set colour", args);
  },
  stafffire: function (args): void {
    trackEvent("Staff fire", args);
  },
  staffhire: function (args): void {
    trackEvent("Staff hire", args);
  },
  staffsetcolour: function (args): void {
    trackEvent("Staff set colour", args);
  },
  staffsetcostume: function (args): void {
    trackEvent("Staff set costume", args);
  },
  staffsetname: function (args): void {
    trackEvent("Staff set name", args);
  },
  staffsetorders: function (args): void {
    trackEvent("Staff set orders", args);
  },
  staffsetpatrolarea: function (args): void {
    trackEvent("Staff set patrol area", args);
  },
  surfacesetstyle: function (args): void {
    trackEvent("Surface set style", args);
  },
  tilemodify: function (args): void {
    trackEvent("Tile modify", args);
  },
  trackplace: function (args): void {
    trackEvent("Track place", args);
  },
  trackremove: function (args): void {
    trackEvent("Track remove", args);
  },
  tracksetbrakespeed: function (args): void {
    trackEvent("Track set brake speed", args);
  },
  wallplace: function (args): void {
    trackEvent("Wall place", args);
  },
  wallremove: function (args): void {
    trackEvent("Wall remove", args);
  },
  wallsetcolour: function (args): void {
    trackEvent("Wall set colour", args);
  },
  waterlower: function (args): void {
    trackEvent("Water lower", args);
  },
  waterraise: function (args): void {
    trackEvent("Water raise", args);
  },
  watersetheight: function (args): void {
    trackEvent("Water set height", args);
  },
  mapchanged_scenarioEditor: function (args): void {
    trackEvent("Map changed scenario editor", args);
  },
  mapchanged_trackDesigner: function (args): void {
    trackEvent("Map changed track designer", args);
  },
  mapchanged_trackManager: function (args): void {
    trackEvent("Map changed track manager", args);
  },
  changemapsize: function (args): void {
    trackEvent("Change map size", args);
  },
  mapchanged_titleScreen: function (args): void {
    trackEvent("Map changed title screen", args);
  },
  mapchanged_inGame: function (args): void {
    trackEvent("Map changed in game", args);
  },
  mapsaved: function (args): void {
    trackEvent("Map saved", args);
  },
  "ride.ratings.calculate": function (args): void {
    trackEvent("Ride ratings calculate", args);
  },
  stallcreate: function (args): void {
    trackEvent("Stall create", args);
  },
  stalldemolish: function (args): void {
    trackEvent("Stall demolish", args);
  },
  stallsetname: function (args): void {
    trackEvent("Stall set name", args);
  },
  stallsetprice: function (args): void {
    trackEvent("Stall set price", args);
  },
  stallsetsetting: function (args): void {
    trackEvent("Stall set setting", args);
  },
  stallopen: function (args): void {
    trackEvent("Stall open", args);
  },
  stallclose: function (args): void {
    trackEvent("Stall close", args);
  },
  "vehicle.crash": function (args): void {
    trackEvent("Vehicle crash", args);
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
    trackEvent("Network join", args);
  },
  "network.leave": function (args): void {
    trackEvent("Network leave", args);
  },
};
