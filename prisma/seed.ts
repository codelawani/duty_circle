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
        "https://media.discordapp.net/attachments/1134839709248536638/1166041745839104051/jack-sparrow-150-150-835656.jpeg?ex=65490c00&is=65369700&hm=ba3b6d59a8ea2f8c6d827b21b30fc125ef4b440d1e744ed0e7905266cba36899&=",
    },
  });

  const jackSession = await prisma.session.create({
    data: {
      userId: jack.id,
      sessionToken: "js",
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
  const stealDirtTaskData = {
    data: {
      title: "Steal a jar of dirt",
      public: false,
      userId: jack.id,
      // circleId: rum.id,
    },
  };
  const stealDirtTask = await prisma.task.create(stealDirtTaskData);

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

  // Create a notification for Jack about the Steal a jar of dirt task
  const stealDirtNotificationData = {
    data: {
      userId: jack.id,
      content: "Your Deadline is looming: Steal a jar of dirt",
      type: "TASK_DEADLINE",
      sourceId: stealDirtTask.id,
      sourceType: "TASK",
    },
  };
  await prisma.notification.create(stealDirtNotificationData);

  async function initblackbeard() {
    const blackbeardImage =
      "https://media.discordapp.net/attachments/1134839709248536638/1166041778164613211/blackbeard-150-150-794105.jpeg?ex=65490c07&is=65369707&hm=7004ee64e2446f4d223a75fb8f9f7a94f910e53999bc6084202f689673f7a4e8&=";

    const blackbeard = await prisma.user.create({
      data: {
        email: "blackbeard@queenannesrevenge.com",
        name: "Captain Blackbeard",
        username: "blackbeard",
        image: blackbeardImage,
      },
    });
    const bbSession = await prisma.session.create({
      data: {
        userId: blackbeard.id,
        sessionToken: "bb",
      },
    });

    // Create a task for Blackbeard to find the Fountain of Youth
    const fountainTaskData = {
      data: {
        title: "Find the Fountain of Youth",
        public: false,
        userId: blackbeard.id,
        tags: {
          connect: [
            {
              id: (await prisma.tag.create({ data: { name: "adventure" } })).id,
            },
            {
              id: (await prisma.tag.create({ data: { name: "exploration" } }))
                .id,
            },
          ],
        },
      },
    };
    const fountainTask = await prisma.task.create(fountainTaskData);

    // Create a task for Blackbeard to plunder a Spanish galleon
    const plunderTaskData = {
      data: {
        title: "Plunder a Spanish galleon",
        public: true,
        dueDate: "2024-01-15T12:00:00.000Z",
        consequence: "We'll lose 10 bags of gold",
        userId: blackbeard.id,
        tags: {
          connect: [
            { id: (await prisma.tag.create({ data: { name: "combat" } })).id },
            {
              id: (await prisma.tag.create({ data: { name: "treasure" } })).id,
            },
          ],
        },
      },
    };
    const plunderTask = await prisma.task.create(plunderTaskData);

    // Create a task for Blackbeard to get his beard braided
    const beardTaskData = {
      data: {
        title: "Get beard braided",
        public: false,
        userId: blackbeard.id,
        tags: {
          connect: [
            {
              id: (await prisma.tag.create({ data: { name: "grooming" } })).id,
            },
            { id: (await prisma.tag.create({ data: { name: "style" } })).id },
          ],
        },
      },
    };
    const beardTask = await prisma.task.create(beardTaskData);

    const sailTaskData = {
      title: "Finish hoisting the sails",
      description:
        "Make sure all the sails are properly hoisted so we can set sail.",
      dueDate: "2024-01-22T12:00:00.000Z",
      consequence: "We'll lose 2 bags of gold",
      public: true,
      userId: blackbeard.id,
      tags: {
        connect: [
          {
            id: (await prisma.tag.findUnique({ where: { name: "sailing" } }))
              .id,
          },
          { id: (await prisma.tag.findUnique({ where: { name: "ship" } })).id },
        ],
      },
    };
    const sailTask = await prisma.task.create({ data: sailTaskData });
  }
  await initblackbeard();
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
