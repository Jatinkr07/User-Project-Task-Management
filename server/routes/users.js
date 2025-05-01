import express from "express";
import {
  getUserDetails,
  updateUserDetails,
} from "../controllers/usersController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", auth, getUserDetails);

router.put("/me", auth, updateUserDetails);

export default router;
