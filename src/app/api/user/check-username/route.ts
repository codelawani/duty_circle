import { userService } from "@/src/lib/services/user";
import apiHandler from "@/src/utils/api/api.handler";
import { NextRequest, NextResponse as res } from "next/server";

const checkUsername = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get("username") || "";

  await userService.checkUsername(username);
  return res.json({ message: "Username is available" });
};

export const GET = apiHandler({ GET: checkUsername });
