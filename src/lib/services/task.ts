import { ValidationError } from "yup";
import prisma from "../db";
import { TaskSchema, Task } from "../types/task.schema";
import { circleService } from "./circle";
import { withErrorHandling } from "./errors";
import { userService } from "./user";
class TaskService {
  constructor() {
    this.getById = withErrorHandling(this.getById, "Error creating task");
    this.create = withErrorHandling(this.create, `Error creating task`);
    this.update = withErrorHandling(this.update, `Error updating task`);
    this.delete = withErrorHandling(this.delete, `Error deleting task`);
  }

  async verifyTaskCircle(task: Task) {
    let { circleId, privacy, userId } = task;
    console.log(circleId, userId);
    if (privacy === "CIRCLE") {
      circleId = circleId ?? undefined;
      const circleExists = await circleService.circleExists(circleId);
      if (!circleExists) throw new ValidationError("Invalid Circle provided");
      const userInCircle = await circleService.userInCircle(userId, circleId);
      if (!userInCircle)
        throw new ValidationError("User doesn't belong to this circle");
      return task;
    } else {
      task.circleId = null;
      return task;
    }
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
    await this.verifyTaskCircle(task);
    const res = await prisma.task.create({ data: task });
    return res;
  }

  async update(id: number, data: Task) {
    const task = await taskService.getById(id);
    let updatedTask = { ...task, ...data };
    console.log(updatedTask);
    updatedTask = await TaskSchema.validate(updatedTask);
    updatedTask = await taskService.verifyTaskCircle(updatedTask);
    const res = await prisma.task.update({ where: { id }, data: updatedTask });
    return res;
  }

  async delete(id: number) {
    const task = await taskService.getById(id);
    if (!task) throw new ValidationError("Task not found");
    await prisma.task.delete({ where: { id } });
    return { message: "Task deleted successfully" };
  }
}
export const taskService = new TaskService();
