import * as yup from "yup";
import { CircleRole } from "@prisma/client";
export const circleSchema = yup.object().noUnknown().shape({
  name: yup.string().required(),
});

export const userCircleSchema = yup
  .object()
  .noUnknown()
  .shape({
    userId: yup.string().required(),
    circleId: yup.string().required(),
    role: yup.mixed<CircleRole>().oneOf(Object.values(CircleRole)),
  });

export type Circle = yup.InferType<typeof circleSchema>;
export type UserCircle = yup.InferType<typeof userCircleSchema>;
export type UserWithCircle = Circle & {
  userId: string;
  role: CircleRole;
  circleId?: string;
};
