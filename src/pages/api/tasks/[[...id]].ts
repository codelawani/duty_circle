import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { butler } from "@/src/lib/services/butler";
import * as Boom from "@hapi/boom";

const T_NOT_FOUND = "Task not found";
const T_INVALID = "Invalid task ID";

export const createTask: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userId = await userService.getId(req, res);
  if (userId) {
    const payload = req.body;
    const result = await taskService.create({ ...payload, userId });
    if (result) res.status(201).json({ msg: "Task created successfully" });
  } else {
    throw Boom.unauthorized("You are not allowed to access this task");
  }
};

export const getTask: NextApiHandler = async (req, res) => {
  // Handler for GET method
  const taskId = butler.getIdFromReq(req);
  if (taskId) {
    const result = await taskService.getById(taskId);
    if (!result) throw Boom.notFound(T_NOT_FOUND);
    res.status(200).json(result);
  } else {
    const tasks = await taskService.getById();
    res.status(200).json(tasks);
  }
};

export const updateTask: NextApiHandler = async (req, res) => {
  // Handler for PUT method
  const taskId = butler.getIdFromReq(req);
  const userId = await userService.getId(req, res);
  const data = { ...req?.body, userId };
  if (taskId) {
    const result = await taskService.update(taskId, data);
    console.log("taskId", taskId, result);
    res.status(201).json({ msg: "Task updated successfully" });
  } else {
    throw Boom.notFound(T_NOT_FOUND);
  }
};

export const deleteTask: NextApiHandler = async (req, res) => {
  // Handler for DELETE method
  const taskId = butler.getIdFromReq(req);
  if (taskId) {
    const response = await taskService.delete(taskId);
    res.status(200).json(response);
  } else {
    throw Boom.notAcceptable(T_INVALID);
  }
};
export default apiHandler({
  GET: getTask,
  POST: createTask,
  PUT: updateTask,
  DELETE: deleteTask,
});
