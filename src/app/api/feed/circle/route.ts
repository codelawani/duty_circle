import { taskService } from "@/src/lib/services/task";
import { userService } from "@/src/lib/services/user";
import apiHandler from "@/src/utils/api/api.handler";
import { Task } from "@/src/lib/types/task.schema";
import { NextResponse as res } from "next/server";

/**
 * Retrieves the tasks in the user's circle feed.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @returns An array of tasks in the user's circle feed.
 */

const getCircleFeed = async (req: Request) => {
  const { id: userId } = await userService.validate();
  const tasks: Task[] = await taskService.getTasksInCircle(userId);
  return res.json(tasks);
};

export const GET = apiHandler({
  GET: getCircleFeed,
});

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
