import prisma from "../db";
import { UserCircle, userCircleSchema } from "../types/circle.schema";

class UserCircleService {
  async create(payload: UserCircle) {
    const data = await userCircleSchema.validate(payload);
    const res = await prisma.userCircle.create({
      data,
    });
    return res;
  }
}
export const userCircleService = new UserCircleService();
