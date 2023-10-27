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

// async function generateFakeTasks(numTasks: number) {
//   const users = await genRandomUsers(10);
//   const tasks = [];
//   for (let i = 0; i < numTasks; i++) {
//     const title = faker.lorem.words();
//     const description = faker.lorem.sentences();
//     const dueDate = faker.date.future();
//     const completed = faker.datatype.boolean();
//     const consequence = faker.lorem.sentences();
//     const randNum = Math.floor(10 * Math.random()) % 10;
//     const userId = users?.[randNum].id;

//     const task = await db.task.create({
//       data: {
//         title,
//         description,
//         dueDate,
//         completed,
//         consequence,
//         userId,
//         public: true,
//       },
//     });
//     tasks.push(task);
//   }
//   return tasks;
// }

// Generate 40 fake tasks
generateFakeTasks(40)
  .then((tasks) => console.log(tasks))
  .catch((e) => console.log(e));

async function genTags(tagNames: Array<string>) {
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

async function generateFakeTasks(numTasks: number) {
  const users = await genRandomUsers(10);
  const tags = await genRandomTags(10);
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

async function genRandomTags(numTags: number) {
  const tags = [];
  for (let i = 0; i < numTags; i++) {
    const name = faker.lorem.word();
    const tag = await db.tag.create({
      data: { name },
    });
    tags.push(tag);
  }
  return tags;
}
