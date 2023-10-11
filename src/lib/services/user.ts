import prisma from "../db";

class UserService {
  async getByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  async getAll() {
    return await prisma.user.findMany();
  }
}
export const userService = new UserService();
