import { userService } from "@/src/lib/services/user";
import apiHandler from "@/src/utils/api/api.handler";
import { NextRequest, NextResponse as res } from "next/server";

/**
 * Check if a username is available
 * @param req - The Next.js request object
 * @returns A JSON response indicating whether the username is available or not
 */
const checkUsername = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get("username") || "";

  await userService.checkUsername(username);
  return res.json({ message: "Username is available" });
};

export const GET = apiHandler({ GET: checkUsername });

/**
 * @swagger
 * /api/user/check-username:
 *   get:
 *     summary: Check if a username is available
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username to check
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message indicating whether the username is available or not
 *                   example: Username is available
 *       409:
 *         description: Conflict
 *       500:
 *         description: Internal Server Error
 */
