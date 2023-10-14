const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  enum CircleRole {
    MEMBER = "MEMBER",
    ADMIN = "ADMIN"
  }

  // Create Jack Sparrow user
  const jack = await prisma.user.create({
    data: {
      email: "jack@sparrow.com",
      name: "Jack Sparrow",
      username: "jacksparrow",
      image: "https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg",
    },
  });

  // Create the Rum circle
  const rum = await prisma.circle.create({
    data: {
      name: "Rum",
    },
  });

  // Add Jack to the Rum circle as an admin
  const jackCircleData = {
    data: {
      userId: jack.id,
      circleId: rum.id,
      role: CircleRole.ADMIN,
    },
  };
  await prisma.userCircle.create(jackCircleData);

  // Create a task for Jack to steal a jar of dirt
  const jackTaskData = {
    data: {
      title: "Steal a jar of dirt",
      privacy: "CIRCLE",
      userId: jack.id,
      circleId: rum.id,
    },
  };
  const jackTask = await prisma.task.create(jackTaskData);

  // Create a task for Jack to find the Black Pearl
  const blackPearlTaskData = {
    data: {
      title: "Find the Black Pearl",
      privacy: "PRIVATE",
      userId: jack.id,
    },
  };
  const blackPearlTask = await prisma.task.create(blackPearlTaskData);

  // Create a notification for Jack about the Rum circle
  const rumNotificationData = {
    data: {
      userId: jack.id,
      content: "You have been added to the Rum circle!",
      type: "CIRCLE_INVITE",
      status: "UNREAD",
    },
  };
  await prisma.notification.create(rumNotificationData);

  // Create a notification for Jack about the Steal a jar of dirt task
  const stealDirtNotificationData = {
    data: {
      userId: jack.id,
      content: "You have a new task: Steal a jar of dirt",
      type: "TASK_ASSIGNED",
      status: "UNREAD",
    },
  };
  await prisma.notification.create(stealDirtNotificationData);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
