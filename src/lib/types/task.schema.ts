import * as yup from "yup";

// Yup fields are optional by default
export const TaskSchema = yup
  .object()
  .noUnknown()
  .shape({
    title: yup.string().required(),
    description: yup.string().nullable(),
    dueDate: yup.date().nullable(),
    completed: yup.boolean(),
    consequence: yup.string().nullable(),
    userId: yup.string().required(),
    public: yup.boolean(),
    tags: yup.array().of(yup.string().default("")).default([]),
  });

export type Task = yup.InferType<typeof TaskSchema>;
