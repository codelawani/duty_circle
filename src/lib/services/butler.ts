import { NextApiRequest } from "next";
import * as Boom from "@hapi/boom";
import { NextRequest } from "next/server";
class Butler {
  /**
   * Extracts the ID from a NextApiRequest object.
   * @param req - The NextApiRequest object.
   * @returns The extracted ID as a string or undefined if it doesn't exist.
   */
  getIdFromReq(req: NextApiRequest) {
    const id = req.query?.id;
    if (!id) throw Boom.badRequest("ID is required");
    return id as string;
  }
  async parseJson(req: NextRequest | Request) {
    try {
      const data = await req.json();
      if (!data) {
        throw Boom.badRequest("Missing data");
      }
      return data;
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw Boom.badRequest("Invalid JSON data");
      } else if (err instanceof TypeError) {
        throw Boom.badRequest("Invalid request data");
      } else if (err instanceof RangeError) {
        throw Boom.badRequest("Request data too large");
      } else {
        throw Boom.badRequest("Unexpected error");
      }
    }
  }
}
export const butler = new Butler();
