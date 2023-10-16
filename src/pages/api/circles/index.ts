import apiHandler from "@/src/utils/api/api.handler";
import { circleService } from "@/src/lib/services/circle";
import { NextApiHandler } from "next";
import { userService } from "@/src/lib/services/user";

export const createCircle: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  await circleService.limitUserCircle(userId);
  const result = await circleService.create({ ...req.body, userId });
  if (result) res.status(201).json({ msg: "Circle created successfully" });
};

export const getAll: NextApiHandler = async (req, res) => {
  const circles = await circleService.getAll();
  console.log(circles);
  res.status(200).json(circles);
};

export default apiHandler({
  POST: createCircle,
  GET: getAll,
});
