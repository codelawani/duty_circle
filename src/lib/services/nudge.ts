import prisma from "../db";
import { Nudge, NudgeSchema } from "../types/nudge.schema.d";
import * as Boom from "@hapi/boom";
import { NotifService } from "./notifs";
import { NotificationType } from "@prisma/client";
import { taskService } from "./task";
import { userService } from "./user";

export class NudgeService {
  async create(payload: Nudge) {
    const { senderId, taskId } = await NudgeSchema.validate(payload);
    const { userId, ...task } = await taskService.getById(taskId);
    const { sender } = await this.validateUsers(senderId, userId);
    const nudge = await prisma.nudge.create({
      data: {
        senderId,
        taskId,
        receiverId: userId,
      },
    });
    if (nudge) {
      const notifInfo = {
        senderId,
        sender,
        userId,
        type: NotificationType.NEW_NUDGE,
        sourceId: nudge.id,
        sourceType: "Nudge",
      };
      await new NotifService(notifInfo).create();
      await prisma.task.update({
        where: { id: taskId },
        data: { nudgeCount: ++task.nudgeCount },
      });
      return nudge;
    } else {
      throw Boom.internal("Error creating Nudge");
    }
  }
  async delete(payload: Nudge) {
    const nudge = await this.checkPrior(payload);
    if (nudge) {
      await prisma.nudge.delete({
        where: { id: nudge.id },
      });
    } else {
      throw Boom.notFound("Nudge not found");
    }
  }
  async checkPrior({ senderId, taskId }: Nudge) {
    return await prisma.nudge.findFirst({
      where: { senderId, taskId },
    });
  }
  async validateUsers(senderId: string, userId: string) {
    const sender = await userService.getById(senderId);
    if (!sender) throw Boom.notFound(`Sender with id[${senderId}] not found`);

    const user = await userService.getById(userId);
    if (!user) throw Boom.notFound(`Receiver with id[${userId}] not found`);

    return { user, sender };
  }
}
export const nudgeService = new NudgeService();
