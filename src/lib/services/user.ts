import prisma from "../db";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import * as Boom from "@hapi/boom";

class UserService {
  async getByEmail(email?: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  async getAll() {
    return await prisma.user.findMany();
  }
  async validate() {
    const session = await getServerSession(authOptions);
    const userMail = session?.user?.email ?? "jack@sparrow.com";
    const user = await this.getByEmail(userMail);
    console.log(user);
    if (!user?.id) {
      throw Boom.unauthorized("You are not allowed to access this resouce");
    }

    return user;
  }
}
export const userService = new UserService();
