import prisma from "../db";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
export async function getAllUsers() {
  return await prisma.user.findMany();
}
