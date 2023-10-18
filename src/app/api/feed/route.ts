import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";
/**
 * Retrieves all tasks from the public feed.
 * @returns {Promise<Task[]>} A promise that resolves to an array of Task objects.
 */
const getPublicFeed = async (req: Request) => {
  const tasks = await taskService.getAllTasks();
  return res.json(tasks);
};
export const GET = apiHandler({ GET: getPublicFeed });
/**
 * @swagger
 * /api/feed/public:
 *   get:
 *     summary: Retrieves all tasks for the public feed.
 *     tags: [Feed]
 *     responses:
 *       200:
 *         description: Returns an array of Task objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
