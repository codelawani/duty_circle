import { ValidationError } from "yup";
import prisma from "../db";
import { TaskSchema, Task } from "../types/task.schema";
import { circleService } from "./circle";
// import { withErrorHandling } from "./errors";
import * as Boom from "@hapi/boom";
class TaskService {
  constructor() {
    // this.getById = withErrorHandling(this.getById, "Error creating task");
    // this.create = withErrorHandling(this.create, `Error creating task`);
    // this.update = withErrorHandling(this.update, `Error updating task`);
    // this.delete = withErrorHandling(this.delete, `Error deleting task`);
  }

  async verifyTaskCircle(task: Task) {
    const verifiedTask = await TaskSchema.validate(task);
    let { circleId, privacy, userId } = verifiedTask;

    if (privacy === "CIRCLE") {
      const circleExists = await circleService.circleExists(circleId);

      if (!circleExists) throw Boom.notFound("Circle not found");

      // Throw error if user not in circle
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

  async getTasksInCircle(circleId: string) {
    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      select: { tasks: true },
    });
    if (!circle) throw Boom.notFound("Circle not found");
    return circle.tasks;
  }
}
export const taskService = new TaskService();
