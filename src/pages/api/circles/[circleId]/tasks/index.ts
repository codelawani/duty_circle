import { circleService } from "@/src/lib/services/circle";
import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { NextApiHandler } from "next";

export const getTasksInCircle: NextApiHandler = async (req, res) => {
  const circleId = circleService.getIdFromReq(req);
  const tasks = await taskService.getTasksInCircle(circleId);
  res.status(200).json(tasks);
};

export const addTasksToCircle: NextApiHandler = async (req, res) => {};

export default apiHandler({
  GET: getTasksInCircle,
});
