//  taskRoutes.ts connects endpoints to controller functions

import { Router } from "express";
import {
  createTask,
  deleteTask,
  gatAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/taskController";
import { validateId } from "../middleware/validated";

// all paths here start with /api/tasks (see app.ts)
// This follows RESTAPI

const router = Router();

router.post("/", createTask);
router.get("/allTasks", gatAllTasks);

// validated runs first; the controller only runs if the id is valid

router.patch("/:id", validateId, updateTask);
router.delete("/:id", validateId, deleteTask);
router.get("/:id", validateId, getTaskById);

export default router;
