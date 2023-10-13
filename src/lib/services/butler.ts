import { NextApiRequest } from "next";

type idtype = number | string
class Butler {
  /**
   * Extracts the ID from a NextApiRequest object.
   * @param req - The NextApiRequest object.
   * @param idtype - Optional parameter to specify the type of ID to extract.
   * @returns The extracted ID as a string or undefined if it cannot be parsed as a number.
   */
  getIdFromReq(req: NextApiRequest, idtype: idtype = 0) {
    const id = req.query?.id?.[0] ?? "";
    if (typeof idtype === "string") return id
    else {
      const taskId = parseInt(id);
      return isNaN(taskId) ? undefined : taskId;
    }
  }
}
export const butler = new Butler();
