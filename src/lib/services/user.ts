import prisma from "../db";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import * as Boom from "@hapi/boom";
import { nanoid } from "nanoid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
  async getById(userId?: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }
  async random_username(email: string) {
    try {
      return await genUniqueUsername(email);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        throw Boom.conflict(
          `Failed to generate unique username for email ${email}: ${e.message}`
        );
      } else if (e instanceof Error) {
        throw Boom.conflict(
          `Failed to generate username for email ${email}: ${e.message}`
        );
      }
    }
  }
}

async function genUniqueUsername(email: string, retries = 3): Promise<string> {
  const username = "user_" + nanoid(11);
  try {
    await prisma.user.update({
      where: { email },
      data: {
        username,
      },
    });
    return username;
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === "P2002" &&
      retries > 0
    ) {
      return await genUniqueUsername(email, retries - 1);
    } else {
      throw e;
    }
  }
}
export const userService = new UserService();
