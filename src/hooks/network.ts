const onNetworkChat = (callback: TCallback) => {
  return context.subscribe("network.chat", (data) => {
    const args = {
      args: data,
      action: "network.chat",
    } as GameActionEventArgs<object>;
    callback(args);
  });
};

const onNetworkAction = (callback: TCallback) => {
  return context.subscribe("network.action", (data: any) => {
    const args = {
      args: data,
      action: "network.action",
    } as GameActionEventArgs<object>;
    callback(args);
  });
};

const onNetworkJoin = (callback: TCallback) => {
  return context.subscribe("network.join", (data: any) => {
    const args = {
      args: data,
      action: "network.join",
    } as GameActionEventArgs<object>;
    callback(args);
  });
};

const onNetworkLeave = (callback: TCallback) => {
  return context.subscribe("network.leave", (data: any) => {
    const args = {
      args: data,
      action: "network.leave",
    } as GameActionEventArgs<object>;
    callback(args);
  });
};

export const onNetworkChange = <T extends NetworkAction>(
  networkAction: T,
  callback: TCallback
) => {
  switch (networkAction) {
    case "network.chat":
      return onNetworkChat(callback);
    case "network.action":
      return onNetworkAction(callback);
    case "network.join":
      return onNetworkJoin(callback);
    case "network.leave":
      return onNetworkLeave(callback);
    default:
      return context.subscribe(
        "action.execute",
        (data: GameActionEventArgs<object>) => {
          if (data.action === networkAction && (data.args as any).flags <= 0) {
            callback(data);
          }
        }
      );
  }
};
