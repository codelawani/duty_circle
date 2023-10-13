import prisma from "../db";
import { withErrorHandling } from "./errors";
import * as Boom from "@hapi/boom"
class CircleService {

  constructor() {
    this.get = withErrorHandling(this.get, "Failed to get circle")
    this.getAll = withErrorHandling(this.getAll, "Failed to get all circles")
    this.circleExists = withErrorHandling(this.circleExists, "Failed to get circle")
    this.userInCircle = withErrorHandling(this.userInCircle, "Action Failed")
  }

  async get(circleId?: string) {
    let circle;
    if (circleId) {
      circle = await prisma.circle.findUnique({
        where: {id: circleId}
      });
    } if (!circle) throw Boom.notFound("Circle not found")
    return circle
  }

  async getAll() {
    const circle = await prisma.circle.findMany()
    return circle
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
