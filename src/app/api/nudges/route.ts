import { butler } from "@/src/lib/services/butler";
import { nudgeService } from "@/src/lib/services/nudge";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";

const createNudge = async (req: Request) => {
  const payload = await butler.parseJson(req);
  await nudgeService.create(payload);
  return res.json({ msg: "Success" });
};

export const POST = apiHandler({ POST: createNudge });
