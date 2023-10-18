import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Method } from "axios";
import * as Boom from "@hapi/boom";
import { errorHandler } from "./error.handler";
import { NextRequest } from "next/server";

type NextHandle = (req: NextRequest | Request) => unknown | Promise<unknown>;
type ApiMethodHandles = {
  [key in Uppercase<Method>]?: NextHandle;
};
export const apiHandle = (handler: ApiMethodHandles) => {
  return async (req: NextRequest | Request) => {
    try {
      const method = req?.method?.toUpperCase() as keyof ApiMethodHandles;
      if (!method) {
        Boom.methodNotAllowed(`No method specified for ${req.url}!`);
      }
      const methodHandler = handler[method];
      if (!methodHandler) {
        Boom.methodNotAllowed(`Method not allowed on path ${req.url}`);
      } else {
        return await methodHandler(req);
      }
    } catch (err) {
      return errorHandler(err);
    }
  };
};

export default apiHandle;
