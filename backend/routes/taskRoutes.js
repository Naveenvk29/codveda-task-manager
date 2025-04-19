import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";

const router = Router();

// Route to create a new task
router.route("/").post(createTask).get(getAllTasks);

// Route to get, update, or delete a task by ID
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

export default router;
