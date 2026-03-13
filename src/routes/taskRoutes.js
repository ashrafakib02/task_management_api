import express from "express";
import {
  createTaskHandler,
  getTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler
} from "../controllers/taskController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const taskRouter = express.Router();

taskRouter.post("/", authenticate, createTaskHandler);
taskRouter.get("/", authenticate, getTasksHandler);
taskRouter.get("/:id", authenticate, getTaskByIdHandler);
taskRouter.patch("/:id", authenticate, updateTaskHandler);
taskRouter.delete("/:id", authenticate, deleteTaskHandler);
export default taskRouter;