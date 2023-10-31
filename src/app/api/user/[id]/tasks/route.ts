import { taskService } from "@/src/lib/services/task";
import { NextRequest, NextResponse as res } from "next/server";
import apiHandler from "@/src/utils/api/api.handler";
import { Params } from "@/src/lib/types/server";

const getUserPublicTasks = async (req: NextRequest, { params }: Params) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("size") || "10";
  const tasks = await taskService.getUserPublicTasks(params.id, page, pageSize);
  return res.json(tasks);
};
export const GET = apiHandler({ GET: getUserPublicTasks });
