import prisma from "../db";
import { TaskSchema, Task } from "../types/task.schema";
import * as Boom from "@hapi/boom";
import { tagService } from "./tags";
import { userService } from "./user";
class TaskService {
  async getById(id: string) {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw Boom.notFound("Task not found");
    return task;
  }
  async getPublicTask(id: string) {
    const { id: userId } = await userService.validate();
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        tags: { select: { name: true } },
        user: {
          select: {
            username: true,
            image: true,
            id: true,
            name: true,
          },
        },
      },
    });
    return task;
  }

  async create(data: Task, id?: string) {
    const { tags: tagNames, ...task } = await TaskSchema.validate(data);
    const tags = await tagService.createorFindMulti(tagNames);
    const res = await prisma.task.create({
      data: {
        ...task,
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
      },
    });
    if (!res) throw Boom.internal("Task creation failed");
    return res;
  }

  async update(id: string, data: Task) {
    const task = await this.getById(id);
    if (!task) throw Boom.notFound("Task not found");
    const { tags: tagNames, ...newData } = await TaskSchema.validate(data);
    const tags = await tagService.createorFindMulti(tagNames);

    // if (newData.public && !newData.completed) {
    //   throw Boom.forbidden("You cannot update an uncompleted public task");
    // }

    const updatedTask = { ...task, ...newData };

    return await prisma.task.update({
      where: { id },
      data: {
        ...updatedTask,
        tags: {
          set: tags.map((tag) => ({ id: tag.id })),
        },
      },
    });
  }

  async delete(id: string) {
    const task = await this.getById(id);
    if (!task) throw Boom.notFound("Task not found");

    const { completed, public: isPublic } = task;

    if (isPublic && !completed) {
      throw Boom.forbidden(
        "You cannot delete a public task, that you are yet to complete"
      );
    }
    await prisma.task.delete({ where: { id } });

    return {};
  }

  async getUserTasks() {
    const { id: userId } = await userService.validate();
    return await prisma.task.findMany({
      where: { userId },
    });
  }
  async getPublicFeed(page: string | null, pageSize: string | null) {
    return await this.paginateTasks(page, pageSize);
  }
  async paginateTasks(
    page: string | null,
    pageSize: string | null,
    userId: string | undefined = undefined
  ) {
    const parsedPage = Math.max(parseInt(page || "1"), 1);
    const take = parseInt(pageSize || "10");
    const skip = (parsedPage - 1) * take;
    if (isNaN(take) || isNaN(skip)) {
      throw Boom.badRequest("Pls provide integer query values");
    }
    const [tasks, count] = await Promise.all([
      prisma.task.findMany({
        skip,
        take,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          public: true,
          userId,
        },
        include: {
          tags: { select: { name: true } },
          user: {
            select: {
              username: true,
              image: true,
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.task.count({ where: { userId } }),
    ]);
    const totalPages = Math.ceil(count / take);
    return { tasks, totalPages };
  }
  async getTasksByTags(tagNames: string[]) {
    return await prisma.task.findMany({
      where: {
        tags: {
          every: {
            name: { in: tagNames },
          },
        },
      },
    });
  }
}
export const taskService = new TaskService();
