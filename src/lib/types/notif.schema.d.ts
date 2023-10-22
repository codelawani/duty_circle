import * as yup from "yup";
import { NotificationType } from "@prisma/client";
export const NotifSchema = yup
  .object()
  .noUnknown()
  .shape({
    content: yup.string().required(),
    userId: yup.string().required(),
    type: yup.string().required().oneOf(Object.values(NotificationType)),
  });
export type Notif = yup.InferType<typeof NotifSchema>;
