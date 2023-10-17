import { NextApiHandler } from "next";
import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";
import { butler } from "@/src/lib/services/butler";
import * as Boom from "@hapi/boom";
import apiHandler from "@/src/utils/api/api.handler";

const T_NOT_FOUND = "Task not found";

export const getTask: NextApiHandler = async (req, res) => {
  const taskId = butler.getIdFromReq(req);
  if (taskId) {
    const result = await taskService.getById(taskId);
    console.log(result);
    if (!result) throw Boom.notFound(T_NOT_FOUND);
    res.status(200).json(result);
  } else {
    throw Boom.badRequest("Task id is required");
  }
};

export const updateTask: NextApiHandler = async (req, res) => {
  const taskId = butler.getIdFromReq(req);
  const { id: userId } = await userService.validate(req, res);
  console.log(userId);
  const data = { ...req?.body, userId };

  const result = await taskService.update(taskId, data);
  console.log("taskId", taskId, result);
  res.status(201).json({ msg: "Task updated successfully" });
};

export const deleteTask: NextApiHandler = async (req, res) => {
  const taskId = butler.getIdFromReq(req);
  const response = await taskService.delete(taskId);
  res.status(200).json(response);
};

export default apiHandler({
  GET: getTask,
  PUT: updateTask,
  DELETE: deleteTask,
});
