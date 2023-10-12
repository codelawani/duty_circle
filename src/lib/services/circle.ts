import { getServerSession } from "next-auth";
import prisma from "../db";

class CircleService {
  async circleExists(circleId?: string | null) {
    if (circleId) {
      const res = await prisma.accountabilityCircle.findUnique({
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
