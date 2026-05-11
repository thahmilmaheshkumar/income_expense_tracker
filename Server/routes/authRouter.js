import express from "express";
import {
  getAll,
  Login,
  logout,
  register,
} from "../controller/authController.js";
import { auth } from "../midlewares/auth.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", register);
router.get("/all", auth, getAll);
router.post("/logout", auth, logout);

export default router;
