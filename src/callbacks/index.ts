import { analytics } from "openrct2-analytics-sdk";

type CallbackMap = Record<ActionType, (args: GameActionEventArgs) => void>;

const trackEvent = (title: string, data: GameActionEventArgs) => {
  analytics.track({
    name: title,
    properties: data,
  });
};

const callbackMap: CallbackMap = {
  balloonpress: (args) => {
    trackEvent("Balloon press", args);
  },
  bannerplace: function (args: GameActionEventArgs<object>): void {
    trackEvent("Banner place", args);
  },
  bannerremove: function (args: GameActionEventArgs<object>): void {
    trackEvent("Banner remove", args);
  },
  bannersetcolour: function (args: GameActionEventArgs<object>): void {
    trackEvent("Banner set colour", args);
  },
  bannersetname: function (args: GameActionEventArgs<object>): void {
    trackEvent("Banner set name", args);
  },
  bannersetstyle: function (args: GameActionEventArgs<object>): void {
    trackEvent("Banner set style", args);
  },
  cheatset: function (args: GameActionEventArgs<object>): void {
    trackEvent("Cheat set", args);
  },
  clearscenery: function (args: GameActionEventArgs<object>): void {
    trackEvent("Clear scenery", args);
  },
  climateset: function (args: GameActionEventArgs<object>): void {
    trackEvent("Climate set", args);
  },
  footpathadditionplace: function (args: GameActionEventArgs<object>): void {
    trackEvent("Footpath addition place", args);
  },
  footpathadditionremove: function (args: GameActionEventArgs<object>): void {
    trackEvent("Footpath addition remove", args);
  },
  footpathplace: function (args: GameActionEventArgs<object>): void {
    trackEvent("Footpath place", args);
  },
  footpathlayoutplace: function (args: GameActionEventArgs<object>): void {
    trackEvent("Footpath layout place", args);
  },
  footpathremove: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  gamesetspeed: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  guestsetflags: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  guestsetname: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  landbuyrights: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  landlower: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  landraise: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  landsetheight: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  landsetrights: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  landsmooth: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  largesceneryplace: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  largesceneryremove: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  largescenerysetcolour: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  loadorquit: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  mapchangesize: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  mazeplacetrack: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  mazesettrack: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  networkmodifygroup: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  parkentranceplace: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  parkentranceremove: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  parkmarketing: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  parksetdate: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  parksetentrancefee: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  parksetloan: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  parksetname: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  parksetparameter: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  parksetresearchfunding: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  pausetoggle: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  peeppickup: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  peepspawnplace: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  playerkick: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  playersetgroup: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridecreate: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridedemolish: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  rideentranceexitplace: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  rideentranceexitremove: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridefreezerating: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridesetappearance: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridesetcolourscheme: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridesetname: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridesetprice: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridesetsetting: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridesetstatus: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  ridesetvehicle: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  scenariosetsetting: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  signsetname: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  signsetstyle: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  smallsceneryplace: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  smallsceneryremove: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  smallscenerysetcolour: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  stafffire: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  staffhire: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  staffsetcolour: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  staffsetcostume: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  staffsetname: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  staffsetorders: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  staffsetpatrolarea: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  surfacesetstyle: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  tilemodify: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  trackdesign: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  trackplace: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  trackremove: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  tracksetbrakespeed: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  wallplace: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  wallremove: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  wallsetcolour: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  waterlower: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  waterraise: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
  watersetheight: function (args: GameActionEventArgs<object>): void {
    throw new Error("Function not implemented.");
  },
};
