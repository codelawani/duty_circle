const { faker } = require("@faker-js/faker");
const { PrismaClient: DbClient } = require("@prisma/client");
const db = new DbClient();

async function genRandomUsers(numUsers: number) {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = firstName + " " + lastName;
    const username = faker.internet.userName({ firstName, lastName });
    const email = faker.internet.email({ firstName, lastName });
    const image = faker.internet.avatar();
    const user = await db.user.create({
      data: { name, email, username, image },
    });
    users.push(user);
  }

  return users;
}

// Generate 40 fake tasks
generateFakeTasks(40)
  .then((tasks) => console.log(tasks))
  .catch((e) => console.log(e));

async function generateFakeTasks(numTasks: number) {
  const users = await genRandomUsers(10);
  const tags = await genRandomTags();
  const tasks = [];
  for (let i = 0; i < numTasks; i++) {
    const title = faker.lorem.words();
    const description = faker.lorem.sentences();
    const dueDate = faker.date.future();
    const completed = faker.datatype.boolean();
    const consequence = faker.lorem.sentences();
    const randNum = Math.floor(10 * Math.random()) % 10;
    const userId = users?.[randNum].id;
    const taskTags = [];
    for (let j = 0; j < 3; j++) {
      const randTagNum = Math.floor(10 * Math.random()) % 10;
      const tagId = tags?.[randTagNum].id;
      taskTags.push(tagId);
    }

    const task = await db.task.create({
      data: {
        title,
        description,
        dueDate,
        completed,
        consequence,
        userId,
        public: true,
        tags: {
          connect: taskTags.map((tagId) => ({ id: tagId })),
        },
      },
    });
    tasks.push(task);
  }
  return tasks;
}

async function genRandomTags() {
  const tagNames = [
    "coding",
    "fitness",
    "music",
    "art",
    "writing",
    "reading",
    "gaming",
    "cooking",
    "gardening",
    "photography",
    "travel",
    "language learning",
    "volunteering",
    "DIY",
    "home improvement",
    "personal finance",
    "meditation",
    "yoga",
    "sports",
    "socializing",
    "relaxation",
    "creativity",
    "learning",
  ];
  const tags = [];
  for (const name of tagNames) {
    try {
      const tag = await db.tag.create({
        data: { name },
      });
      tags.push(tag);
    } catch (e: any) {
      if (e.code === "P2002") {
        const tag = await db.tag.findUnique({ where: { name } });
        tags.push(tag);
      } else {
        console.log(e);
      }
    }
  }
  return tags;
}
