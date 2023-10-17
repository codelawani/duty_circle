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

export const getCircle: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  const circle = await circleService.get(userId);
  console.log(circle);
  res.status(200).json(circle);
};

export const updateCircle: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  await circleService.verifyCircleAdmin(userId);

  // Admin must be current user sending request for now.
  req.body.adminId = userId;

  await circleService.update(req.body, userId);
  res.status(200).json({ msg: "Circle updated Successfully" });
};

export const deleteCircle: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  await circleService.delete(userId);
  res.status(200).json({ msg: "Circle deleted successfully" });
};

export default apiHandler({
  POST: createCircle,
  GET: getCircle,
  PUT: updateCircle,
  DELETE: deleteCircle,
});
