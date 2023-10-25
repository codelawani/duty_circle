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
  sender?: User;
}
export class NotifService {
  constructor(
    private readonly notifInfo: INotifInfo,
    private content: string = "You got a new message"
  ) {}
  async create() {
    const notifData = this.setContent();
    const data = await NotifSchema.validate(notifData);

    const notif = await prisma.notification.create({ data });
    if (!notif) throw Boom.internal("Error creating notification");
    console.log(notif);
    return notif;
  }
  setContent() {
    const { type, sender } = this.notifInfo;
    if (type === NotificationType.NEW_NUDGE && sender?.username) {
      this.content = `${sender.username} is sending you a nudge.\n You can DO IT 🦾`;
    }
    return { ...this.notifInfo, content: this.content };
  }
  async validateUsers() {
    const { senderId, userId } = this.notifInfo;
    if (!senderId) throw Error("Pls provide a sender Id");
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
      include: {
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
  async update(notifId: string) {
    const notif = await prisma.notification.findUnique({
      where: { id: notifId },
    });
    if (!notif) throw Boom.notFound("Notification not found");
    const newNotif = await prisma.notification.update({
      where: { id: notifId },
      data: { seen: true },
    });
    if (!newNotif) throw Boom.internal("Something went wrong");
  }
}
