import prisma from "../db";
import { TaskSchema, Task } from "../types/task.schema.d";
import { circleService } from "./circle";
import * as Boom from "@hapi/boom";
class TaskService {
  async verifyTaskCircle(task: Task) {
    const verifiedTask = await TaskSchema.validate(task);
    let { circleId, userId } = verifiedTask;

    if (circleId) {
      const circleExists = await circleService.circleExists(circleId);

      if (!circleExists) throw Boom.notFound("Circle not found");

      // Will Throw error if user not in circle
      await circleService.userInCircle(userId, circleId);
    } else {
      verifiedTask.circleId = null;
    }
    return verifiedTask;
  }

  async getById(id?: string) {
    if (id) {
      return await prisma.task.findUnique({ where: { id } });
    } else {
      return await prisma.task.findMany();
    }
  }

  async create(data: Task, id?: string) {
    const task = await TaskSchema.validate(data);
    await taskService.verifyTaskCircle(task);
    const res = await prisma.task.create({ data: task });
    if (!res) throw Boom.internal("Task creation failed");
    return res;
  }

  async update(id: string, data: Task) {
    const task = await taskService.getById(id);
    if (!task) throw Boom.notFound("Task not found");

    const updatedTask = { ...task, ...data };
    const verifiedTask = await taskService.verifyTaskCircle(updatedTask);

    return await prisma.task.update({ where: { id }, data: verifiedTask });
  }

  async delete(id: string) {
    const task = await taskService.getById(id);
    if (!task) throw Boom.notFound("Task not found");

    await prisma.task.delete({ where: { id } });

    return { message: "Task deleted successfully" };
  }

  async getTasksInCircle(userId: string) {
    const tasks = await prisma.userCircle.findFirst({
      where: { userId },
      select: { tasks: true },
    });
    return tasks;
  }
  async getAllTasks() {
    return await prisma.task.findMany();
  }
  async getTasksByTags(tags: string[]) {
    return await prisma.task.findMany({
      where: {
        tags: {
          every: {
            tag: {
              name: { in: tags },
            },
          },
        },
      },
    });
  }
}
export const taskService = new TaskService();
