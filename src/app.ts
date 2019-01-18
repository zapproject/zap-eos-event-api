const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
import config from "./config";

import express from "express";
import { NextFunction, Request, Response, Router} from "express";
import path from "path";
import indexRouter from "./routes/index";
import {retranslate} from "./routes/socket/retranslate";
const app = express();
export const server = require('http').Server(app);


retranslate(app, server, config.netUrl, config.contract);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) =>  {
  next(createError(404));
});

// error ehandler
app.use((err: any, req: Request, res: Response, next: NextFunction) =>  {
  res.status(err.status || 500);
  res.send(err);
});

export default app;
