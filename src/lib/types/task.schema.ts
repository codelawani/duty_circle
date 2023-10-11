import * as yup from "yup";

// Yup fields are optional by default
export const TaskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  dueDate: yup.date(),
  status: yup.string().oneOf(["PENDING", "COMPLETED"]).required(),
  privacy: yup.string().oneOf(["PRIVATE", "PUBLIC", "CIRCLE"]).required(),
  consequence: yup.string(),
  userId: yup.string().required(),
  circleId: yup.string(),
});

export type Task = yup.InferType<typeof TaskSchema>;
