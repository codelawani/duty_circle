import { userService } from "@/src/lib/services/user";
import { Params } from "@/src/lib/types/server";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";
import { butler } from "@/src/lib/services/butler";

const getUser = async (req: Request, { params }: Params) => {
  const user = await userService.getPublicUser(params.id);
  return res.json(user);
};

const updateUser = async (req: Request, { params }: Params) => {
  const payload = await butler.parseJson(req);
  const user = await userService.update(params.id, payload);
  return res.json(user);
};

export const GET = apiHandler({
  GET: getUser,
});

export const PUT = apiHandler({
  PUT: updateUser,
});
