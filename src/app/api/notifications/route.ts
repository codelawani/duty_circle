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
 * /api/notifications:
 *   get:
 *     summary: Retrieves all notifications for the authenticated user.
 *     tags:
 *       - Notifications
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A JSON response containing the paginated list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
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
 *         sourceId:
 *           type: string
 *           description: The unique identifier for the source of the notification
 *         sourceType:
 *           type: string
 *           description: The type of the source of the notification
 *         content:
 *           type: string
 *           description: The content of the notification.
 *         type:
 *           $ref: '#/components/schemas/NotificationType'
 *         seen:
 *           type: boolean
 *           description: Indicates whether the notification has been seen by the user.
 *         sender:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: The username of the sender.
 *             name:
 *               type: string
 *               description: The name of the sender.
 *             image:
 *               type: string
 *               description: The image URL of the sender.
 *       example:
 *         id: "197191d8-f872-4b06-b60a-2f3d90939db2"
 *         createdAt: "2023-10-24T23:49:49.571Z"
 *         updatedAt: "2023-10-24T23:49:49.571Z"
 *         userId: "c952a877-a297-41e8-aa60-ec972d9ce896"
 *         sourceId: "855e7653-6e6a-4e0a-8cc0-633c862639af"
 *         sourceType: "Nudge"
 *         senderId: "fc26fa5b-b2e7-4d5f-9284-b2799ac193d4"
 *         content: "blackbeard is sending you a nudge.\n You can DO IT 🦾"
 *         type: "NEW_NUDGE"
 *         seen: false
 *         sender:
 *           username: "blackbeard"
 *           name: "Captain Blackbeard"
 *           image: "https://img.com"

 *     NotificationType:
 *       type: string
 *       enum:
 *         - TASK_DEADLINE
 *         - NEW_NUDGE
 *         - CIRCLE_INVITE
 *         - FRIEND_REQUEST
 */
