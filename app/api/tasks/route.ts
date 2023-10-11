import prisma from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/app/lib/services/user";
import { createTask } from "@/app/lib/services/task";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { data: session } = useSession();
  const payload = req.body;
  if (session?.user?.email) {
    const user = await getUserByEmail(session.user?.email);
    const res = createTask({ ...payload, userId: user?.id });
  } else res.status(401).send({ error: "User doesn't exist" });
}
