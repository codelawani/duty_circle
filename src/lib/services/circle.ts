import { NextApiRequest } from "next";
import prisma from "../db";
import { Circle, circleSchema, UserWithCircle } from "../types/circle.schema";
import { userCircleSchema, UserCircle } from "../types/circle.schema";
import * as Boom from "@hapi/boom";

const DEFAULT_USER_ROLE = "ADMIN";
const CIRCLE_LIMIT = 1;

class CircleService {
  getIdFromReq(req: NextApiRequest) {
    console.log(req.query);
    const { circleId: id } = req.query;
    if (!id) throw Boom.badRequest("Circle Id is required");
    return id as string;
  }
  async get(circleId?: string, userId?: string) {
    let circle;
    if (circleId) {
      circle = await prisma.circle.findUnique({
        where: { id: circleId },
        select: { members: { select: { userId: true } }, adminId: true },
      });
    }
    if (!circle) throw Boom.notFound("Circle not found");

    const isMember = circle.members.some((member) => member.userId === userId);

    if (!isMember) throw Boom.unauthorized("You can't access this circle");
    return circle;
  }

  async validateCircleName(name: string, userId: string) {
    const res = await prisma.userCircle.findFirst({
      where: {
        userId,
        circle: {
          name,
        },
      },
    });
    return res;
  }

  async create(payload: UserWithCircle) {
    const { name, userId, ...userCircleData } = payload;
    const circleData = await circleSchema.validate({ name, adminId: userId });

    const userInCircle = await circleService.validateCircleName(name, userId);
    if (userInCircle) {
      throw Boom.conflict("You already created a Circle with that name");
    }

    const { id: circleId } = await prisma.circle.create({
      data: circleData,
    });

    return await circleService.addAdminToCircle({
      ...userCircleData,
      circleId,
      userId,
    });
  }

  async limitUserCircle(userId: string) {
    const circleCount = await prisma.userCircle.count({
      where: { userId },
    });

    if (circleCount >= CIRCLE_LIMIT) {
      const suffix = CIRCLE_LIMIT > 1 ? "s" : "";
      throw Boom.forbidden(
        `You can only belong to ${CIRCLE_LIMIT} circle${suffix}`
      );
    }
  }

  async addAdminToCircle(payload: UserCircle) {
    const data = await userCircleSchema.validate(payload);

    // User creating circle is admin by default
    data.role = DEFAULT_USER_ROLE;

    const res = await prisma.userCircle.create({ data });
    return res;
  }

  async getAll() {
    const circle = await prisma.circle.findMany();
    return circle;
  }

  async circleExists(circleId?: string | null) {
    if (circleId) {
      const res = await prisma.circle.findUnique({
        where: { id: circleId },
      });
      if (res) return true;
    }
    return false;
  }

  async userInCircle(userId: string, circleId?: string | null) {
    if (circleId) {
      const res = await prisma.userCircle.findFirst({
        where: { circleId: circleId, userId },
      });
      if (res) return true;
      else throw Boom.unauthorized("User does not exist in this circle");
    }
    throw Boom.notFound("Circle doesn't exist");
  }

  async update(circleId: string, payload: Circle) {
    const data = await circleSchema.validate(payload);
    const circle = await prisma.circle.findFirst({
      where: { id: circleId },
    });
    // await circleService.userInCircle(data.adminId, circleId);
    const updatedCircle = { ...circle, ...data };
    const res = await prisma.circle.update({
      where: { id: circleId },
      data: updatedCircle,
    });

    if (!res) throw new Error("Something went wrong");

    return res;
  }
  async verifyCircleAdmin(circleId: string, userId: string) {
    const circle = await circleService.get(circleId, userId);
    if (circle.adminId !== userId) {
      throw Boom.unauthorized("You are not allowed to access this resource");
    }
    return userId;
  }
  async delete(circleId: string, userId: string) {
    await circleService.verifyCircleAdmin(circleId, userId);
    const res = prisma.circle.findFirst({
      where: { id: circleId },
    });
    if (!res) throw Boom.notFound("Circle doesn't exist");
    return await prisma.circle.delete({
      where: { id: circleId },
    });
  }
}

export const circleService = new CircleService();
