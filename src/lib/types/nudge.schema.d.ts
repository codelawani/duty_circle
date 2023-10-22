import * as yup from "yup";

export const NudgeSchema = yup.object().noUnknown().shape({
  senderId: yup.string().required(),
  taskId: yup.string().required(),
});

export type Nudge = yup.InferType<typeof NudgeSchema>;
