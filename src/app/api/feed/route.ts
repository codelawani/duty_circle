import { taskService } from "@/src/lib/services/task";
import apiHandler from "@/src/utils/api/api.handler";
import { NextRequest, NextResponse as res } from "next/server";

/**
 * Retrieves a paginated list of public feed tasks.
 * @param req - The Next.js request object.
 * @returns A JSON response containing the paginated list of tasks.
 */
const getPublicFeed = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page");
  const pageSize = searchParams.get("size");
  const result = await taskService.getPublicFeed(page, pageSize);
  return res.json(result);
};
export const GET = apiHandler({ GET: getPublicFeed });

// Swagger documentation
/**
 * @swagger
 * /api/feed:
 *   get:
 *     tags: [Feed]
 *     summary: Retrieves a paginated list of public feed tasks.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The number of tasks to retrieve per page.
 *     responses:
 *       200:
 *         description: A JSON response containing the paginated list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskFeed:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task.
 *         description:
 *           type: string
 *           nullable: true
 *           description: A description of the task.
 *         dueDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: The due date of the task.
 *         completed:
 *           type: boolean
 *           description: The completion status of the task.
 *         consequence:
 *           type: string
 *           nullable: true
 *           description: The consequence of the task.
 *         public:
 *           type: boolean
 *           description: The privacy setting of the task.
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             image:
 *               type: string
 *             id:
 *               type: string
 *             name:
 *               type: string
 *       example:
 *         title: "Finish hoisting the sails"
 *         description: "Make sure all the sails are properly hoisted so we can set sail."
 *         dueDate: "2024-01-22T12:00:00.000Z"
 *         completed: false
 *         consequence: "We'll lose 2 bags of gold"
 *         public: true
 *         tags:
 *           - name: "sailing"
 *           - name: "ship"
 *         user:
 *           username: "JackSparrow"
 *           image: "https://i.pinimg.com/550x/3e/1c/82/3e1c82385d98040224f65175d2e5f75c.jpg"
 *           id: "b5402fac-1ea1-4900-a538-ee5b1afcb669"
 *           name: "Captain Jack Sparrow"
 */
