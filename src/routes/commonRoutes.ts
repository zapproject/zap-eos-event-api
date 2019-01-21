import express from "express";
const router = express.Router();
import {getActionsList, getLast} from "./commonFunctions";
const ObjectId = require("mongodb").ObjectID;
import { NextFunction, Request, Response, Router} from "express";
import config from "../config";

const {actions} = config;

router.get("/events/:action/all", async (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.params.action ||
    actions.indexOf(req.params.action) === -1 ||
    isNaN(req.query.offset) ||
    isNaN(req.query.limit)
  ) {
    return;
  }
  res.send(await getActionsList(req.params.action, parseInt(req.query.offset, 10), parseInt(req.query.limit, 10)));
});

router.get("/getlast/:collection", async (req: Request, res: Response, next: NextFunction) => {
  let resp: any = await getLast(req.params.collection);
  if (!resp) { resp = {_id: 0}; }
  const last = (resp) ? resp._id : 0;
  res.send(JSON.stringify({last}));
});

router.get("/isnew/:collection/:id", async (req: Request, res: Response, next: NextFunction) => {
  let resp: any = await getLast(req.params.collection);
  if (!resp) { resp = {_id: 0}; }
  let isNew = false;
  if (resp._id && req.params.id === "0") {
    isNew = true;
  } else if (resp._id && req.params.id !== "0") {
    isNew = ObjectId(req.params.id) < ObjectId(resp._id);
  }
  res.send(JSON.stringify({lastTaken: (resp && resp._id) ? resp._id : 0, isNew}));
});
export default router;
