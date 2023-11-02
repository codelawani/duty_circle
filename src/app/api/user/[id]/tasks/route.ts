import { taskService } from "@/src/lib/services/task";
import { NextRequest, NextResponse as res } from "next/server";
import apiHandler from "@/src/utils/api/api.handler";
import { Params } from "@/src/lib/types/server";

/**
 * Retrieves public tasks for a specific user.
 * @param req - The Next.js request object.
 * @param params - The route parameters, including the user ID.
 * @returns A JSON response containing the user's public tasks.
 */
const getUserPublicTasks = async (req: NextRequest, { params }: Params) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("size") || "10";
  const tasks = await taskService.getUserPublicTasks(params.id, page, pageSize);
  return res.json(tasks);
};

/**
 * @swagger
 * /api/user/{id}/tasks:
 *   get:
 *     summary: Retrieves public tasks for a specific user.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose tasks to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A JSON response containing the user's public tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
export const GET = apiHandler({ GET: getUserPublicTasks });
