import prisma from "../db";
import { TaskSchema, Task } from "../types/task.schema";
import * as Boom from "@hapi/boom";
import { tagService } from "./tags";
class TaskService {
  async getById(id?: string) {
    if (id) {
      return await prisma.task.findUnique({ where: { id } });
    } else {
      return await prisma.task.findMany();
    }
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

    await prisma.task.delete({ where: { id } });

    return { message: "Task deleted successfully" };
  }

  async getAllTasks() {
    return await prisma.task.findMany();
  }
  async getPublicFeed() {
    return await prisma.task.findMany({
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
