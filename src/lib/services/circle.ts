import prisma from "../db";
import { circleSchema, UserWithCircle } from "../types/circle.schema";
import { withErrorHandling } from "./errors";
import * as Boom from "@hapi/boom";
import { userCircleService } from "./userCircle";
class CircleService {
  constructor() {
    this.get = withErrorHandling(this.get, "Failed to get circle");
    this.getAll = withErrorHandling(this.getAll, "Failed to get all circles");
    this.circleExists = withErrorHandling(
      this.circleExists,
      "Failed to get circle"
    );
    this.userInCircle = withErrorHandling(this.userInCircle, "Action Failed");
  }

  async get(circleId?: string) {
    let circle;
    if (circleId) {
      circle = await prisma.circle.findUnique({
        where: { id: circleId },
      });
    }
    if (!circle) throw Boom.notFound("Circle not found");
    return circle;
  }

  async create(payload: UserWithCircle) {
    const { name, ...userCircleData } = payload;
    const circleData = await circleSchema.validate({ name });

    const userInCircle = await circleService.userInCircle(
      userCircleData.userId,
      userCircleData.circleId
    );

    const { id: circleId } = await prisma.circle.create({ data: circleData });

    return await userCircleService.create({ ...userCircleData, circleId });
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
    }
    return false;
  }
}

export const circleService = new CircleService();
