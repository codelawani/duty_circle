import { NotifService } from "@/src/lib/services/notifs";
import { userService } from "@/src/lib/services/user";
import { Params } from "@/src/lib/types/server";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";

/**
 * Marks a notification as seen.
 * @param {Request} req - The request object.
 * @param {Params} params - The route parameters.
 * @returns {Promise<NextResponse>} - The response object.
 */
const updateNotif = async (
  req: Request,
  { params }: Params
): Promise<NextResponse> => {
  const notifId = params.id;
  const { id: userId } = await userService.validate();
  const notifService = new NotifService({ userId });
  await notifService.update(notifId);
  return res.json({ msg: "Notification updated successfully" });
};
export const PUT = apiHandler({ PUT: updateNotif });

/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Marks a notification as seen.
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notification to mark as seen.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The notification was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message.
 */
