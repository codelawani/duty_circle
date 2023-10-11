import * as Boom from "@hapi/boom";
import { NextApiResponse } from "next";
import { ZodError } from "zod";
export function errorHandler(
  err: unknown,
  res: NextApiResponse<ErrorResponse>
) {
  if (Boom.isBoom(err)) {
    return res
      .status(err.output.statusCode)
      .json({ error: { message: err.message } });
  } else if (err instanceof ZodError) {
    return res.status(400).json({ error: { message: err.message } });
  } else {
    return res.status(500).json({
      error: { message: "Something went wrong", err },
      status: Boom.isBoom(err) ? err.output.statusCode : 500,
    });
  }
}
