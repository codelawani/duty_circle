import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";
import { butler } from "@/src/lib/services/butler";

/**
 * Creates a new task for a user.
 * @param req - The HTTP request object.
 * @returns A JSON response indicating whether the task was created successfully.
 */
const createTask = async (req: Request) => {
  const { id: userId } = await userService.validate();
  const payload = await butler.parseJson(req);
  const task = await taskService.create({ ...payload, userId });

  return res.json(task, { status: 201 });
};

/**
 * Retrieves all tasks from the database.
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<void>} - A Promise that resolves with the retrieved tasks.
 */
const getAllTasks = async () => {
  const tasks = await taskService.getUserTasks();
  return res.json(tasks);
};

export const GET = apiHandler({
  GET: getAllTasks,
});
export const POST = apiHandler({
  POST: createTask,
});

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Task]
 *     description: Create a new task for current user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for current user
 *     tags: [Task]
 *     description: Retrieve a list of tasks.
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: The specified task was not found.
 */
