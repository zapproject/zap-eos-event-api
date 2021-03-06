import {DemuxEventListener as Listener} from "@zapjs/eos-node-utils";
import config from "../../config";

export const retranslate = async(app: any, server: any, net: string, contract: string) => {
  const io = require("socket.io")(server);
  const {actions, baseKeepTime} = config;
  Listener.start([net, contract, baseKeepTime, 'smallListener']).then(() => {
    actions.forEach((action: string) => {
      const newsocket = io.of(`/events/${action}`).on("connection", (socket: any) =>
      socket.emit("start", { message: `You are listening the '${contract}::${action}' events` }));
      new Listener().on(`${contract}::${action}`, (err: any, data: any) => {
        console.log("data", data)
        if (err) {
          newsocket.emit("err", {data: err});
        }
        newsocket.emit("data", {data});
      });
    });
  });
};
