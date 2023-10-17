import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { NextApiHandler } from "next";

export const createTask: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  const payload = req.body;
  const result = await taskService.create({ ...payload, userId });

  if (result) res.status(201).json({ msg: "Task created successfully" });
};

export const getAllTasks: NextApiHandler = async (req, res) => {
  const tasks = await taskService.getById();
  res.status(200).json(tasks);
};

export default apiHandler({
  GET: getAllTasks,
  POST: createTask,
});
