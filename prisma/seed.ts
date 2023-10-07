const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "example@example.com",
      name: "Example User",
      username: "exampleuser",
      password: "securepassword",
      imageUrl: "link-to-image.jpg",
    },
  });
  const circle1 = await prisma.accountabilityCircle.create({
    data: {
      name: "Circle 1",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
