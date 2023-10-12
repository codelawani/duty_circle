import { NextApiRequest } from "next";

class Butler {
  getIdFromReq(req: NextApiRequest) {
    const id = req.query?.id?.[0] ?? "";
    const taskId = parseInt(id);
    return isNaN(taskId) ? null : taskId;
  }
}
export const butler = new Butler();
