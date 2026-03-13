import { createTaskSchema } from "../validators/taskValidator.js";
import { createTask, getTaskByIdAndUserId } from "../services/taskService.js";
import { updateTaskSchema } from "../validators/taskValidator.js";
import { updateTaskById, deleteTaskById } from "../services/taskService.js";
import { getTasksByUserIdWithQuery } from "../services/taskService.js";
import { taskQuerySchema } from "../validators/taskQueryValidator.js";
import { asyncHandler } from "./../utils/asyncHandler.js";

export const createTaskHandler = asyncHandler(async (req, res) => {
  const validatedData = createTaskSchema.parse(req.body);

  const task = await createTask({
    ...validatedData,
    userId: req.user.userId,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });
});

export const getTasksHandler = asyncHandler(async (req, res) => {
  const query = taskQuerySchema.parse(req.query);

  const result = await getTasksByUserIdWithQuery(req.user.userId, query);

  res.status(200).json({
    success: true,
    message: "Tasks fetched successfully",
    ...result,
  });
});

export const getTaskByIdHandler = asyncHandler(async (req, res) => {
  const task = await getTaskByIdAndUserId(req.params.id, req.user.userId);

  if (!task) {
    const error = new Error("Task not found");
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Task fetched successfully",
    task,
  });
});

export const updateTaskHandler = asyncHandler(async (req, res) => {
  const validatedData = updateTaskSchema.parse(req.body);

  const updatedTask = await updateTaskById(
    req.params.id,
    req.user.userId,
    validatedData
  );

  if (!updatedTask) {
    const error = new Error("Task not found");
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    updatedTask,
  });
});
export const deleteTaskHandler = asyncHandler(async (req, res) => {
  const deletedTask = await deleteTaskById(req.params.id, req.user.userId);

  if (!deletedTask) {
    const error = new Error("Task not found");
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
