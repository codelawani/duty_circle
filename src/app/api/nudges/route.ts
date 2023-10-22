import { butler } from "@/src/lib/services/butler";
import { nudgeService } from "@/src/lib/services/nudge";
import apiHandler from "@/src/utils/api/api.handler";
import { NextResponse as res } from "next/server";

const createNudge = async (req: Request) => {
  const payload = await butler.parseJson(req);
  await nudgeService.create(payload);
  return res.json({ msg: "Success" });
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
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
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
