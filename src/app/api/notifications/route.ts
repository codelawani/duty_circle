import { NotifService } from "@/src/lib/services/notifs";
import { userService } from "@/src/lib/services/user";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";

/**
 * Retrieves all notifications for the authenticated user.
 * @param {Request} req - The request object.
 * @returns {Promise<Response>} - The response object containing the notifications.
 */
const getNotifs = async (req: Request) => {
  const { id: userId } = await userService.validate();
  const notifService = new NotifService({ userId });
  const notifs = await notifService.getAllForUser();
  return res.json(notifs);
};
export const GET = apiHandler({ GET: getNotifs });

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Retrieves all notifications for the authenticated user.
 *     tags:
 *       - Notifications
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns an array of notifications.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Notification'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the notification.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the notification was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the notification was last updated.
 *         userId:
 *           type: string
 *           description: The unique identifier for the user associated with the notification.
 *         content:
 *           type: string
 *           description: The content of the notification.
 *         type:
 *           $ref: '#/components/schemas/NotificationType'
 *         seen:
 *           type: boolean
 *           description: Indicates whether the notification has been seen by the user.
 *     NotificationType:
 *       type: string
 *       enum:
 *         - TASK_DEADLINE
 *         - NEW_NUDGE
 *         - CIRCLE_INVITE
 *         - FRIEND_REQUEST
 */
