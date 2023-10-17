import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { NextApiHandler } from "next";

/**
 * Retrieves all tasks from the public feed.
 * @returns {Promise<Task[]>} A promise that resolves to an array of Task objects.
 */
export const getPublicFeed: NextApiHandler = async (req, res) => {
  return await taskService.getAllTasks();
};

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

export default apiHandler({
  GET: getPublicFeed,
});
