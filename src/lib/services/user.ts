import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../db";
import { getServerSession } from "next-auth";
import authOptions from "../auth";

class UserService {
  async getByEmail(email?: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  async getAll() {
    return await prisma.user.findMany();
  }
  async getId(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const userMail = session?.user?.email ?? "lawani.gk@gmail.com";
    const user = await this.getByEmail(userMail);
    return user?.id;
  }
}
export const userService = new UserService();
