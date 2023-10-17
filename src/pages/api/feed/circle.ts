import { taskService } from "@/src/lib/services/task";
import { userService } from "@/src/lib/services/user";
import apiHandler from "@/src/utils/api/api.handler";
import { NextApiHandler } from "next";
import { Task } from "@/src/lib/types/task.schema";

/**
 * Retrieves the tasks in the user's circle feed.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @returns An array of tasks in the user's circle feed.
 */

export const getCircleFeed: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  const tasks: Task[] = await taskService.getTasksInCircle(userId);
  return tasks;
};

/**
 * Swagger JSDoc annotations:
 * @swagger
 * /api/feed/circle:
 *   get:
 *     summary: Retrieves the tasks in the user's circle feed.
 *     tags: [Feed]
 *     responses:
 *       200:
 *         description: An array of tasks in the user's circle feed.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

export default apiHandler({
  GET: getCircleFeed,
});
