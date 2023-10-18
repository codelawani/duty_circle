import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Method } from "axios";
import * as Boom from "@hapi/boom";
import { errorHandler } from "./error.handler";
import { NextResponse as res } from "next/server";
type ApiMethodHandlers = {
  [key in Uppercase<Method>]?: NextApiHandler;
};
const apiHandler = (handler: ApiMethodHandlers) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const method = req?.method?.toUpperCase() as keyof ApiMethodHandlers;
      if (!method) {
        Boom.methodNotAllowed(`No method specified for ${req.url}!`);
      }
      const methodHandler = handler[method];
      if (!methodHandler) {
        Boom.methodNotAllowed(`Method not allowed on path ${req.url}`);
      } else {
        await methodHandler(req, res);
      }
    } catch (err) {
      errorHandler(err, res);
    }
  };
};
type NextHandle = (req: NextApiRequest) => unknown | Promise<unknown>;
type ApiMethodHandles = {
  [key in Uppercase<Method>]?: NextHandle;
};
export const apiHandle = (handler: ApiMethodHandles) => {
  return async (req: NextApiRequest) => {
    try {
      const method = req?.method?.toUpperCase() as keyof ApiMethodHandlers;
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

// export default apiHandler;
