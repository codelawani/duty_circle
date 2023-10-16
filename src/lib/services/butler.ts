import { NextApiRequest } from "next";
import * as Boom from "@hapi/boom";
class Butler {
  /**
   * Extracts the ID from a NextApiRequest object.
   * @param req - The NextApiRequest object.
   * @returns The extracted ID as a string or undefined if it doesn't exist.
   */
  getIdFromReq(req: NextApiRequest) {
    console.log(req.query);
    const id = req.query?.id?.[0];
    if (!id) throw Boom.badRequest("ID is required");
    return id;
  }
}
export const butler = new Butler();
