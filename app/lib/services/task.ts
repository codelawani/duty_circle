import prisma from "../db";
import { getUserByEmail } from "./user";
import { TaskSchema, Task } from "../types/task.schema";

export async function createTask(data: TaskSchema) {
  try {
    const task = Task.parse(data);
    const res = await prisma.task.create({ data });
    return res;
  } catch (err) {
    console.error(err);
    return { error: "There was an error creating the task" };
  }
}
