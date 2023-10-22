import { NotifService } from "@/src/lib/services/notifs";
import { userService } from "@/src/lib/services/user";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";

const getNotifs = async (req: Request) => {
  const { id: userId } = await userService.validate();
  const notifService = new NotifService({ userId });
  const notifs = await notifService.getAllForUser();
  return res.json(notifs);
};
export const GET = apiHandler({ GET: getNotifs });
