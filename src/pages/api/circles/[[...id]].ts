import { butler } from "@/src/lib/services/butler";
import { circleService } from "@/src/lib/services/circle";
import apiHandler from "@/src/utils/api/api.handler";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const getCircle: NextApiHandler = async (req, res) => {
  const id = butler.getIdFromReq(req)
  const circle = await circleService.get(id)
  res.status(200).json(circle)
}
export const createCircle: NextApiHandler = async(req, res)=> {
  const payload = req.body
  // const circle =
}

export default apiHandler({
  GET: getCircle
})
