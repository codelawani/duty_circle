import { ValidationError } from "yup";
import prisma from "../db";
import { TaskSchema, Task } from "../types/task.schema";
import { circleService } from "./circle";
import { withErrorHandling } from "./errors";
class TaskService {
  constructor() {
    this.create = withErrorHandling(this.create, `Error creating task`);
    this.update = withErrorHandling(this.update, `Error updating task`);
    this.delete = withErrorHandling(this.delete, `Error deleting task`);
  }
  async get(taskId?: string) {
    let res;
    if (taskId) {
      const id = parseInt(taskId, 10);
      res = await prisma.task.findUnique({ where: { id } });
    } else {
      res = await prisma.task.findMany();
    }
    return res;
  }
  async create(data: Task, id?: number) {
    const task = await TaskSchema.validate(data);
    const { circleId, privacy, userId } = task;
    const circleExists = await circleService.circleExists(circleId);
    if (privacy === "CIRCLE") {
      if (!circleExists) throw new ValidationError("Invalid Circle provided");
      const userInCircle = await circleService.userInCircle(userId, circleId);
      if (!userInCircle)
        throw new ValidationError("User doesn't belong to this circle");
    }
    const res = await prisma.task.create({ data: task });
    return res;
  }

  async update(id: number, data: Task) {
    const task = await TaskSchema.validate(data);
    const res = await prisma.task.update({ where: { id }, data: task });
    return res;
  }

  async delete(id: number) {
    const res = await prisma.task.delete({ where: { id } });
    return res;
  }
}
export const taskService = new TaskService();
