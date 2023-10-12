import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { getServerSession } from "next-auth";
import authOptions from "@/src/lib/auth";
import { Task } from "@/src/lib/types/task.schema";

export const createTask: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  const userMail = session?.user?.email;
  const payload = req.body;
  if (userMail) {
    const user = await userService.getByEmail(userMail);
    const result = await taskService.create({ ...payload, userId: user?.id });
    if (result) res.status(201).json({ msg: "Task created successfully" });
  } else {
    res.status(401).send({ error: "No be you get this task" });
  }
};
export const getTask: NextApiHandler = async (req, res) => {
  // Handler for GET method
  const { id } = req.query;
  const taskId = Array.isArray(id) ? id[0] : undefined;
  if (taskId) {
    const result = await taskService.get(taskId);
    if (!result) res.status(404).json({ error: "Task doesn't exist" });
    res.status(200).json(result);
  } else {
    const tasks = await taskService.get();
    res.status(200).json(tasks);
  }
};

export const updateTask: NextApiHandler = async (req, res) => {
  // Handler for PUT method
};

export const deleteTask: NextApiHandler = async (req, res) => {
  // Handler for DELETE method
};

export default apiHandler({
  GET: getTask,
  POST: createTask,
  PUT: updateTask,
  DELETE: deleteTask,
});
