import { butler } from "@/src/lib/services/butler";
import { circleService } from "@/src/lib/services/circle";
import { userService } from "@/src/lib/services/user";
import apiHandler from "@/src/utils/api/api.handler";
import { NextApiHandler } from "next";

export const getCircle: NextApiHandler = async (req, res) => {
  const id = butler.getIdFromReq(req);
  const circle = await circleService.get(id);
  res.status(200).json(circle);
};

export const createCircle: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  await circleService.limitUserCircle(userId);
  const result = await circleService.create({ ...req.body, userId });
  if (result) res.status(201).json({ msg: "Circle created successfully" });
};

export const updateCircle: NextApiHandler = async (req, res) => {
  const circleId = butler.getIdFromReq(req);
  const { id: userId } = await userService.validate(req, res);
  await circleService.verifyCircleAdmin(circleId, userId);

  // if (!req.body?.adminId) {
  req.body.adminId = userId;
  // }

  const result = await circleService.update(circleId, req.body);
  res.status(200).json({ msg: "Circle updated Successfully" });
};

export const deleteCircle: NextApiHandler = async (req, res) => {
  const circleId = butler.getIdFromReq(req);
  const { id: userId } = await userService.validate(req, res);
  await circleService.delete(circleId, userId);
  res.status(200).json({ msg: "Circle deleted successfully" });
};

export default apiHandler({
  GET: getCircle,
  POST: createCircle,
  PUT: updateCircle,
  DELETE: deleteCircle,
});
