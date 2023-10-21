const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  enum CircleRole {
    MEMBER = "MEMBER",
    ADMIN = "ADMIN",
  }
  const deleteAll = async () => {
    const tablenames = await prisma.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
      .map(({ tablename }: { tablename: string }) => tablename)
      .filter((name: string) => name !== "_prisma_migrations")
      .map((name: string) => `"public"."${name}"`)
      .join(", ");

    try {
      return await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE ${tables} CASCADE;`
      );
    } catch (error) {
      console.log({ error });
    }
  };

  console.log(await deleteAll());
  // Create Jack Sparrow user
  const jack = await prisma.user.create({
    data: {
      email: "jack@sparrow.com",
      name: "Captain Jack Sparrow",
      username: "jacksparrow",
      image:
        "https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg",
    },
  });

  // Create the Rum circle
  // const rum = await prisma.circle.create({
  //   data: {
  //     name: "Rum",
  //     adminId: jack.id,
  //   },
  // });

  // Add Jack to the Rum circle as an admin
  // const jackCircleData = {
  //   data: {
  //     userId: jack.id,
  //     circleId: rum.id,
  //     role: CircleRole.ADMIN,
  //   },
  // };
  // await prisma.userCircle.create(jackCircleData);

  // Create a task for Jack to steal a jar of dirt
  const jackTaskData = {
    data: {
      title: "Steal a jar of dirt",
      public: false,
      userId: jack.id,
      // circleId: rum.id,
    },
  };
  const jackTask = await prisma.task.create(jackTaskData);

  // Create a task for Jack to find the Black Pearl
  const blackPearlTaskData = {
    data: {
      title: "Find the Black Pearl",
      public: true,
      userId: jack.id,
    },
  };
  const blackPearlTask = await prisma.task.create(blackPearlTaskData);
  const sailTaskData = {
    title: "Finish hoisting the sails",
    description:
      "Make sure all the sails are properly hoisted so we can set sail.",
    dueDate: "2024-01-22T12:00:00.000Z",
    consequence: "We'll lose 2 bags of gold",
    public: true,
    userId: jack.id,
  };
  const tags = await createTags(["sailing", "ship"]);
  const sailTask = await prisma.task.create({
    data: {
      ...sailTaskData,
      tags: {
        connect: tags.map((tag) => ({ id: tag.id })),
      },
    },
  });
  // Create a nudge notification for Jack
  const rumNotificationData = {
    data: {
      userId: jack.id,
      content: "You can do it ✔️",
      type: "NEW_NUDGE",
    },
  };
  await prisma.notification.create(rumNotificationData);

  // Create a notification for Jack about the Steal a jar of dirt task
  const stealDirtNotificationData = {
    data: {
      userId: jack.id,
      content: "Your Deadline is looming: Steal a jar of dirt",
      type: "TASK_DEADLINE",
    },
  };
  await prisma.notification.create(stealDirtNotificationData);
}
async function createTags(tagNames: Array<string>) {
  tagNames = tagNames?.filter((name) => !!name);
  const tags = tagNames
    ? await Promise.all(
        tagNames.map(async (name) => {
          let tag;
          tag = await prisma.tag.findUnique({
            where: { name },
          });
          if (!tag) {
            tag = await prisma.tag.create({
              data: { name },
            });
          }
          return tag;
        })
      )
    : [];
  return tags;
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
