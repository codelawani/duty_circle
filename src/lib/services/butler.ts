import { NextApiRequest } from "next";

class Butler {
  /**
   * Extracts the ID from a NextApiRequest object.
   * @param req - The NextApiRequest object.
   * @returns The extracted ID as a string or undefined if it doesn't exist.
   */
  getIdFromReq(req: NextApiRequest) {
    return req.query?.id?.[0];
  }
}
export const butler = new Butler();
