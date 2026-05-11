import express from "express";
import { addTracker } from "../controller/tracker.js";
import { auth } from "../midlewares/auth.js";

const routers = express.Router();

routers.post("/add", auth, addTracker);

export default routers;
