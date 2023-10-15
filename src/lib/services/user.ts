import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../db";
import { getServerSession } from "next-auth";
// import getSession
import authOptions from "../auth";
import * as Boom from "@hapi/boom";
import { User } from ".prisma/client";
class UserService {
  async getByEmail(email?: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  async getAll() {
    return await prisma.user.findMany();
  }
  async validate(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const userMail = session?.user?.email ?? "jack@sparrow.com";
    const user = await this.getByEmail(userMail);

    if (!user?.id) {
      throw Boom.unauthorized("You are not allowed to access this resouce");
    }

    return user;
  }
  isUserCircleAdmin: NextApiHandler = async (req, res) => {
    const user = await userService.validate(req, res);
    // if (user)
  };
}
export const userService = new UserService();
