import express from "express";
import { auth } from "../middleware/auth.js";

import {
  getUserDetails,
  updateUserDetails,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/me", auth, getUserDetails);

router.put("/me", auth, updateUserDetails);

export default router;
