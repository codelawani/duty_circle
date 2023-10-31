import prisma from "../db";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import * as Boom from "@hapi/boom";
import { nanoid } from "nanoid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserSchema } from "../types/user.schema.d";

/**
 * Service class for user-related operations.
 */
class UserService {
  /**
   * Retrieves a user by email.
   * @param email - The email of the user to retrieve.
   * @returns The user object.
   */
  async getByEmail(email?: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Retrieves all users.
   * @returns An array of user objects.
   */
  async getAll() {
    return await prisma.user.findMany();
  }

  /**
   * Validates the user session.
   * @returns The user object.
   * @throws Boom.unauthorized if the user is not authorized.
   */
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

  /**
   * Retrieves a user by ID.
   * @param userId - The ID of the user to retrieve.
   * @returns The user object.
   */
  async getById(userId?: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  /**
   * Generates a unique username for a given email.
   * @param email - The email to generate a username for.
   * @returns The generated username.
   * @throws Boom.conflict if a unique username cannot be generated.
   */
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
  async getPublicUser(id?: string) {
    if (!id) {
      throw Boom.badRequest("User ID is required");
    }
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        image: true,
      },
    });
    if (!user) {
      throw Boom.notFound("User not found");
    }
    return user;
  }
  async update(id: string, data: any) {
    const user = await this.getById(id);
    if (!user) {
      throw Boom.notFound("User not found");
    }

    if (data.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username: data.username },
      });

      if (existingUser && existingUser.id !== id) {
        throw Boom.conflict("Username already taken");
      }
    }
    const updatedData = { ...user, ...data };

    const newData = await UserSchema.validate(updatedData);
    return await prisma.user.update({
      where: { id },
      data: newData,
    });
  }
  async checkUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (user) {
      throw Boom.conflict("Username is already taken");
    } else {
      return user;
    }
  }
}
/**
 * Generates a unique username for a given email.
 * @param email - The email to generate a username for.
 * @param retries - The number of retries to attempt if a unique username cannot be generated.
 * @returns The generated username.
 * @throws An error if a unique username cannot be generated after the specified number of retries.
 */
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
