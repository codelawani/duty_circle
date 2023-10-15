import * as Boom from "@hapi/boom";
import { NextApiResponse } from "next";
import { ValidationError } from "yup";

export function errorHandler(
  err: unknown,
  res: NextApiResponse<ErrorResponse>
) {
  console.error(`${err}`);
  if (Boom.isBoom(err)) {
    return res
      .status(err.output.statusCode)
      .json({ error: { message: err.message } });
  } else if (err instanceof ValidationError) {
    return res.status(400).json({
      error: { message: "Action failed", err: err.errors.join(", ") },
    });
  } else {
    return res.status(500).json({
      error: { message: "Something went wrong", err },
      status: Boom.isBoom(err) ? err.output.statusCode : 500,
    });
  }
}
