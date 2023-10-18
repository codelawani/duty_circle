/**
 * Defines the routes for circle API.
 * @module circleRoute
 */

import { apiHandle } from "@/src/utils/api/api.handler";
import { circleService } from "@/src/lib/services/circle";
import { userService } from "@/src/lib/services/user";
import { NextResponse as res } from "next/server";
import { butler } from "@/src/lib/services/butler";

/**
 * Creates a new circle.
 * @param req - The incoming request object.
 * @returns A JSON object with a success message if the circle was created successfully.
 */
const createCircle = async (req: Request) => {
  const data = await butler.parseJson(req);
  const { id: userId } = await userService.validate();
  await circleService.limitUserCircle(userId);
  await circleService.create({ ...data, userId });
  return res.json({ msg: "Circle created successfully" }, { status: 201 });
};

/**
 * Retrieves the circle for the authenticated user.
 * @param req - The incoming request object.
 * @returns The circle object for the authenticated user.
 */
const getCircle = async () => {
  const { id: userId } = await userService.validate();
  const circle = await circleService.get(userId);
  console.log(circle);
  return res.json(circle, { status: 200 });
};

/**
 * Updates the circle for the authenticated user.
 * @param req - The incoming request object.
 * @returns A JSON object with a success message if the circle was updated successfully.
 */
const updateCircle = async (req: Request) => {
  const { id: userId } = await userService.validate();
  await circleService.verifyCircleAdmin(userId);

  const data = await butler.parseJson(req);
  // Admin must be current user sending request for now.
  data.adminId = userId;

  await circleService.update(data, userId);
  return res.json({ msg: "Circle updated Successfully" }, { status: 201 });
};

/**
 * Deletes the circle for the authenticated user.
 * @returns A JSON object with a success message
 * if the circle was deleted successfully.
 */
const deleteCircle = async () => {
  const { id: userId } = await userService.validate();
  await circleService.delete(userId);
  return res.json({ msg: "Circle deleted successfully" }, { status: 200 });
};

export const GET = apiHandle({ GET: getCircle });
export const POST = apiHandle({ POST: createCircle });
export const PUT = apiHandle({ PUT: updateCircle });
export const DELETE = apiHandle({ DELETE: deleteCircle });

/**
 * @swagger
 * /api/circle:
 *   get:
 *     summary: Retrieves the circle for the authenticated user.
 *     tags: [Circle]
 *     responses:
 *       200:
 *         description: The circle object for the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circle'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       429:
 *         $ref: '#/components/responses/TooManyRequestsError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     summary: Creates a new circle.
 *     tags: [Circle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the circle.
 *               description:
 *                 type: string
 *                 description: The description of the circle.
 *               color:
 *                 type: string
 *                 description: The color of the circle.
 *             example:
 *               name: "My Circle"
 *               description: "This is my circle"
 *               color: "#FF0000"
 *     responses:
 *       201:
 *         description: Circle created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: The success message.
 *               example:
 *                 msg: "Circle created successfully"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       429:
 *         $ref: '#/components/responses/TooManyRequestsError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   put:
 *     summary: Updates an existing circle.
 *     tags: [Circle]
 *     description: Updates an existing circle with the specified ID.
 *     requestBody:
 *       description: The updated circle object.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Circle'
 *     responses:
 *       200:
 *         description: The updated circle object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circle'
 *       404:
 *         description: The circle with the specified ID was not found.
 *       500:
 *         description: An error occurred while updating the circle.
 *   delete:
 *     summary: Deletes an existing circle.
 *     tags: [Circle]
 *     description: Deletes an existing circle with the specified ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the circle to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The circle was successfully deleted.
 *       404:
 *         description: The circle with the specified ID was not found.
 *       500:
 *         description: An error occurred while deleting the circle.
 */
