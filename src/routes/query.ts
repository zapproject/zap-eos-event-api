import {DemuxEventListener as Listener} from "@zapjs/eos-node-utils";
import express from "express";
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
import { NextFunction, Request, Response} from "express";
import config from "../config";
const url = config.mongoUrl;

const dbName = "local";

async function getPossibleLostAnswer(id: number, subscriber: string, provider: string, timestamp: number) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = client.db(dbName);
  const collection = db.collection("respond");
  const res = await collection.findOne({
    "createdAt": { $gt : timestamp },
    "data.id": id,
    "data.provider": provider,
    "data.subscriber": subscriber
  });
  return (res) ? res.data.params : "";
}

router.post("/getresponsebyid", (req: Request, res: Response, next: NextFunction) => {
  const listener = new Listener();
  let fullfilled = false;

  const promise = new Promise(async (resolve, reject) => {

    const cb = (err: any, response: any) => {
      if ( fullfilled || !response.length) { return; }
      const resp = response[0];
      if (resp.data.id === req.body.id &&
      resp.data.responder === req.body.provider &&
      resp.data.subscriber === req.body.subscriber) {
        fullfilled = true;
        resolve(resp.data.params);
      }
    };

    listener.on("zap.main::respond", cb);
    getPossibleLostAnswer(req.body.id, req.body.subscriber, req.body.provider, req.body.timestamp).then((answer) => {
      if (answer && !fullfilled) {
        fullfilled = true;
        resolve(answer);
      }
    });
  });
  promise.then((response) => res.send({response}));
});

export default router;
