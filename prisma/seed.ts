const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const jack = await prisma.user.create({
    data: {
      email: "jack@sparrow.com",
      name: "Jack Sparrow",
      username: "jacksparrow",
      image: "https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg",
    },
  });
  const rum = await prisma.circle.create({
    data: {
      name: "Rum",
    },
  });
  const jackCircleData = {
    data: {
      userId: jack.id,
      circleId: rum.id,
      role: "ADMIN"
    }
  }
  const jackCircle = await prisma.userCircle.create(jackCircleData)
  const jackTask = await prisma.task.create({
    data: {
      title: "Steal a jar of dirt",
      privacy: "CIRCLE",
      userId: jack.id,
      circleId: rum.id
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
