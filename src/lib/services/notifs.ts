import prisma from "../db";
import * as Boom from "@hapi/boom";
import { userService } from "./user";
import { NotificationType, User } from "@prisma/client";
import { NotifSchema } from "../types/notif.schema.d";
interface INotifInfo {
  senderId?: string;
  userId: string;
  type?: NotificationType;
  sourceType?: string;
  sourceId?: string;
}
export class NotifService {
  constructor(
    private readonly notifInfo: INotifInfo,
    private content: string = "You got a new message"
  ) {}
  async create() {
    const { sender } = await this.validateUsers();
    const notifData = this.setContent(sender);
    const data = await NotifSchema.validate(notifData);

    const notif = await prisma.notification.create({ data });
    if (!notif) throw Boom.internal("Error creating notification");
    console.log(notif);
    return notif;
  }
  setContent(sender: User) {
    const { type } = this.notifInfo;
    if (type === NotificationType.NEW_NUDGE) {
      this.content = `${sender.username} is sending you a nudge.\n You can DO IT 🦾`;
    }
    return { ...this.notifInfo, content: this.content };
  }
  async validateUsers() {
    const { senderId, userId } = this.notifInfo;

    const sender = await userService.getById(senderId);
    if (!sender) throw Boom.notFound(`Sender with id[${senderId}] not found`);

    const user = await userService.getById(userId);
    if (!user) throw Boom.notFound(`Receiver with id[${userId}] not found`);

    return { user, sender };
  }
  async getAllForUser() {
    const { userId } = this.notifInfo;
    return await prisma.notification.findMany({
      orderBy: { updatedAt: "desc" },
      where: { userId },
      select: {
        id: true,
        userId: true,
        sourceId: true,
        sourceType: true,
        type: true,
        seen: true,
        sender: {
          select: {
            username: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }
}
