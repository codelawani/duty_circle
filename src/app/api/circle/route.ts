import { apiHandle } from "@/src/utils/api/api.handler";
import { circleService } from "@/src/lib/services/circle";
import { NextApiHandler, NextApiRequest } from "next";
import { userService } from "@/src/lib/services/user";
import { NextResponse as res } from "next/server";
/**
 * Creates a new circle.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @returns A JSON object with a success message if the circle was created successfully.
 */
export const createCircle = async (req: Request) => {
  console.log(await req.json());
  const { id: userId } = await userService.validate(req);
  // await circleService.limitUserCircle(userId);
  const result = await circleService.create({ ...req.body, userId });
  if (result) res.json({ msg: "Circle created successfully" }, { status: 201 });
};

/**
 * Retrieves the circle for the authenticated user.
 * @param req - The incoming request object.
 * @returns The circle object for the authenticated user.
 */
export const getCircle = async (req: NextApiRequest) => {
  const { id: userId } = await userService.validate(req);
  const circle = await circleService.get(userId);
  console.log(circle);
  return res.json(circle, { status: 200 });
};

/**
 * Updates the circle for the authenticated user.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @returns A JSON object with a success message if the circle was updated successfully.
 */
export const updateCircle: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  await circleService.verifyCircleAdmin(userId);

  // Admin must be current user sending request for now.
  req.body.adminId = userId;

  await circleService.update(req.body, userId);
  res.status(201).json({ msg: "Circle updated Successfully" });
};

/**
 * Deletes the circle for the authenticated user.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @returns A JSON object with a success message if the circle was deleted successfully.
 */
export const deleteCircle: NextApiHandler = async (req, res) => {
  const { id: userId } = await userService.validate(req, res);
  await circleService.delete(userId);
  res.status(204).json({ msg: "Circle deleted successfully" });
};

export const GET = apiHandle({ GET: getCircle });
export const POST = apiHandle({ POST: createCircle });
// export default apiHandler({
//   POST: createCircle,
//   GET: getCircle,
//   PUT: updateCircle,
//   DELETE: deleteCircle,
// });

/**
 * @swagger
 * /api/circle:
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
