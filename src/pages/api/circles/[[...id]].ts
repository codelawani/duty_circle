import { butler } from "@/src/lib/services/butler";
import { circleService } from "@/src/lib/services/circle";
import apiHandler from "@/src/utils/api/api.handler";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const getCircle: NextApiHandler = async (req, res) => {
  console.log(req.query);
  const id = butler.getIdFromReq(req,"")
  const circle = await circleService.get(id)
}

export default apiHandler({
  GET: getCircle
})
