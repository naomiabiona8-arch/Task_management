// TaskController.ts - THE LOGIC FOR EAC TASK ENDPOINT
// Each function follows the same simple flow:
// 1. Read what we need from the request (req.body/ req.params)
// 2. Ask the database (Through the Task model)
// 3. Send back a response with a status code + JSON

import { Request, Response } from "express";
import Task from "../models/task";

// Status codes that might be used:
// POST: TO CREATE A NEW TASK

export const createTask = async (req: Request, res: Response) => {
  // 1. put in the fields/keys into the req.body
  const { title, description, tag } = req.body;

  // Save it if a field is missing/Error handling
  if (!title || !description || !tag) {
    res.status(406).json({ message: "All fields must be filled" });
  }

  //   3.Save aall information of title,description and tag in the database
  const task = await Task.create({ title, description, tag });

  // 4. 201 = Created
  res.status(201).json({ message: "Task created Successfully", task });
};

// GET REQUEST: TO GET ALL TASKS

export const gatAllTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find();

  res.status(200).json({ tasks });
};

// PATCH -> update a task
export const updateTask = async (req: Request, res: Response) => {
  const { title, description, tag } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, tag },
    // send back the task after the update
    { returnDocument: "after", runValidators: true },
    //  apply the schema rules on updates too
  );

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({ message: "Task updated successfully", task });
};

// DELETE A TASK
export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({ message: "Task deleted successfully" });
};

// GET -> get one task
export const getTaskById = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({ task });
};
