import { userService } from "@/src/lib/services/user";
import { Params } from "@/src/lib/types/server";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";
import { butler } from "@/src/lib/services/butler";

/**
 * Retrieves a public user by ID.
 * @param req - The incoming request.
 * @param params - The route parameters.
 * @returns The public user object.
 */
const getUser = async (req: Request, { params }: Params) => {
  const user = await userService.getPublicUser(params.id);
  return res.json(user);
};

/**
 * Updates a user by ID.
 * @param req - The incoming request.
 * @param params - The route parameters.
 * @returns The updated user object.
 */
const updateUser = async (req: Request, { params }: Params) => {
  const payload = await butler.parseJson(req);
  const user = await userService.update(params.id, payload);
  return res.json(user);
};

/**
 * Retrieves a public user by ID.
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieves a public user by ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The public user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     summary: Updates a user by ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated user object.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const GET = apiHandler({
  GET: getUser,
});

export const PUT = apiHandler({
  PUT: updateUser,
});
