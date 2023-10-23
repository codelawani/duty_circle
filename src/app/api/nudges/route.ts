import { butler } from "@/src/lib/services/butler";
import { nudgeService } from "@/src/lib/services/nudge";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";

const createNudge = async (req: Request) => {
  const payload = await butler.parseJson(req);
  const nudge = await nudgeService.create(payload);
  return res.json(nudge);
};

export const POST = apiHandler({ POST: createNudge });

/**
 * @swagger
 * /api/nudges:
 *   post:
 *     summary: Create a new nudge
 *     tags: [Nudge]
 *     description: Endpoint to create a new nudge
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createNudge'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nudge'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     createNudge:
 *       type: object
 *       required:
 *         - taskId
 *         - senderId
 *       properties:
 *         taskId:
 *           type: string
 *           description: The task Id
 *         senderId:
 *           type: string
 *           description: The id of user sending Nudge
 *       example:
 *         taskId: "cb70f91b-6517-4eb0-a383-7a5642b0edba"
 *         senderId: "b5402fac-1ea1-4900-a538-ee5b1afcb669"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Nudge:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the nudge
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the nudge was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the nudge was last updated
 *         message:
 *           type: string
 *           description: The message of the nudge
 *         senderId:
 *           type: string
 *           description: The unique identifier of the sender of the nudge
 *         receiverId:
 *           type: string
 *           description: The unique identifier of the receiver of the nudge
 *         taskId:
 *           type: string
 *           description: The unique identifier of the task associated with the nudge
 *       example:
 *         id: "cb70f91b-6517-4eb0-a383-7a5642b0edba"
 *         createdAt: "2022-01-01T00:00:00.000Z"
 *         updatedAt: "2022-01-01T00:00:00.000Z"
 *         message: "You can do it 🦾"
 *         senderId: "b5402fac-1ea1-4900-a538-ee5b1afcb669"
 *         receiverId: "c5f8d3b9-8c6e-4b5d-9a5c-3d8e3d9c8d6f"
 *         taskId: "d8b8d9c8-7b6a-5c4d-3e2f-1a0b9c8d7e6f"
 */
