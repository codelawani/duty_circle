import { butler } from "@/src/lib/services/butler";
import { circleService } from "@/src/lib/services/circle";
import { userService } from "@/src/lib/services/user";
import apiHandler from "@/src/utils/api/api.handler";
import { NextApiHandler } from "next";
import * as Boom from "@hapi/boom";
export const getCircle: NextApiHandler = async (req, res) => {
  const id = butler.getIdFromReq(req);
  const circle = await circleService.get(id);
  res.status(200).json(circle);
};
export const createCircle: NextApiHandler = async (req, res) => {
  const userId = await userService.getId(req, res);
  if (userId) {
    const result = await circleService.create({ ...req.body, userId });
    if (result) res.status(201).json({ msg: "Circle created successfully" });
  } else {
    throw Boom.unauthorized("You are not allowed to create a circle");
  }
};

export default apiHandler({
  GET: getCircle,
  POST: createCircle,
});
