import * as Boom from "@hapi/boom";
import { NextApiResponse } from "next";
import { NextResponse as res } from "next/server";
import { ValidationError } from "yup";

export function errorHandler(
  err: unknown
  // res: NextApiResponse<ErrorResponse>
) {
  console.error(`${err}`);
  if (Boom.isBoom(err)) {
    return (
      res
        // .status(err.output.statusCode)
        .json(
          { error: { message: err.message.replace('"', "'") } },
          { status: err.output.statusCode }
        )
    );
  } else if (err instanceof ValidationError) {
    return res.json({
      error: {
        message: "Action failed",
        err: err.errors.join(", ").replaceAll('"', "'"),
      },
    });
  } else {
    return res.json({
      error: { message: "Something went wrong", err },
      status: Boom.isBoom(err) ? err.output.statusCode : 500,
    });
  }
}
