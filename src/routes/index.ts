import express from "express";
import commonRouter from "./commonRoutes";
import queryRouter from "./query";
const router = express.Router();

router.use("/query", queryRouter);
router.use("/common", commonRouter);

export default router;
