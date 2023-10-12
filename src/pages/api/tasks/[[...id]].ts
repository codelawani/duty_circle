import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { getServerSession } from "next-auth";
import authOptions from "@/src/lib/auth";
export const createTask: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  const userMail = session?.user?.email || "lawani.gk@gmail.com";
  const payload = req.body;
  if (userMail) {
    const user = await userService.getByEmail(userMail);
    const result = await taskService.create({ ...payload, userId: user?.id });
    if (result) res.status(201).json({ msg: "Task created successfully" });
  } else {
    res.status(401).send({ error: "User doesn't exist" });
  }
};
export const getTask: NextApiHandler = async (req, res) => {
  // Handler for GET method
  const id = req.query?.id;
  const taskId = id ? id[0] : "";
  if (taskId) {
    console.log(taskId);
    const result = await taskService.get(taskId);
    res.status(200).json(result);
  } else {
    res.status(401).json({ error: "Task doesn't exist" });
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
