import { ValidationError } from "yup";
import prisma from "../db";
import { TaskSchema, Task } from "../types/task.schema";
import { circleService } from "./circle";
import { withErrorHandling } from "./errors";
import * as Boom from "@hapi/boom";
class TaskService {
  constructor() {
    this.getById = withErrorHandling(this.getById, "Error creating task");
    this.create = withErrorHandling(this.create, `Error creating task`);
    this.update = withErrorHandling(this.update, `Error updating task`);
    this.delete = withErrorHandling(this.delete, `Error deleting task`);
  }

  async verifyTaskCircle(task: Task) {
    const verifiedTask = await TaskSchema.validate(task);
    let { circleId, privacy, userId } = verifiedTask;

    if (privacy === "CIRCLE") {
      const circleExists = await circleService.circleExists(circleId);

      if (!circleExists) throw Boom.notFound("Circle not found");
      const userInCircle = await circleService.userInCircle(userId, circleId);

      if (!userInCircle)
        throw new ValidationError("User doesn't belong to this circle");
    } else {
      verifiedTask.circleId = null;
    }
    return verifiedTask;
  }

  async getById(id?: number) {
    if (id) {
      return await prisma.task.findUnique({ where: { id } });
    } else {
      return await prisma.task.findMany();
    }
  }

  async create(data: Task, id?: number) {
    const task = await TaskSchema.validate(data);
    await taskService.verifyTaskCircle(task);
    const res = await prisma.task.create({ data: task });
    return res;
  }

  async update(id: number, data: Task) {
    const task = await taskService.getById(id);
    if (!task) throw Boom.notFound("Task not found");

    const updatedTask = { ...task, ...data };
    const verifiedTask = await taskService.verifyTaskCircle(updatedTask);

    return await prisma.task.update({ where: { id }, data: verifiedTask });
  }

  async delete(id: number) {
    const task = await taskService.getById(id);
    if (!task) throw Boom.notFound("Task not found");

    await prisma.task.delete({ where: { id } });

    return { message: "Task deleted successfully" };
  }
}
export const taskService = new TaskService();
