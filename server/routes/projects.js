import express from "express";

import {
  createProject,
  createProjectTask,
  deleteProject,
  deleteProjectTask,
  getProjectAllTask,
  getProjectById,
  getProjectsData,
  getProjectTaskById,
  updateProject,
  updateProjectTask,
} from "../controllers/projectsController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getProjectsData);
router.post("/", auth, createProject);
router.get("/:id", auth, getProjectById);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

// TASK ROUTES

router.get("/:projectId/tasks", auth, getProjectAllTask);
router.post("/:projectId/tasks", auth, createProjectTask);
router.get("/:projectId/tasks/:taskId", auth, getProjectTaskById);
router.put("/:projectId/tasks/:taskId", auth, updateProjectTask);
router.delete("/:projectId/tasks/:taskId", auth, deleteProjectTask);

export default router;
