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
    res.status(201).json({ msg: "Task created successfully" });
  } else {
    res.status(401).send({ error: "User doesn't exist" });
  }
};
export const getTask: NextApiHandler = async (req, res) => {
  // Handler for GET method
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
