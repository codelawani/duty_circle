import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { NextApiHandler } from "next";

/**
 * Creates a new task for a user.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A JSON response indicating whether the task was created successfully.
 */
export const createTask: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  const payload = req.body;
  const result = await taskService.create({ ...payload, userId });

  if (result) res.status(201).json({ msg: "Task created successfully" });
};

/**
 * Retrieves all tasks from the database.
 * @function
 * @async
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} - A Promise that resolves with the retrieved tasks.
 */
export const getAllTasks: NextApiHandler = async (req, res) => {
  const tasks = await taskService.getById();
  res.status(200).json(tasks);
};

export default apiHandler({
  GET: getAllTasks,
  POST: createTask,
});

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Task]
 *     description: Create a new task.
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
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the task was created successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get tasks
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
