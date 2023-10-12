import * as yup from "yup";

// Yup fields are optional by default
const validatePrivacy = (value: string | undefined, context: any) => {
  const { circleId } = context.parent;
  if (value === "CIRCLE" && !circleId) {
    return false;
  }
  return true;
};
const validateCircleId = (value: string | undefined, context: any) => {
  const { privacy } = context.parent;
  if (privacy !== "CIRCLE" && value) {
    return false;
  }
  return true;
};
export const TaskSchema = yup
  .object()
  .noUnknown()
  .shape({
    title: yup.string().required(),
    description: yup.string(),
    dueDate: yup.date(),
    status: yup.string().oneOf(["PENDING", "COMPLETED"]).required(),
    consequence: yup.string(),
    userId: yup.string().required(),
    privacy: yup
      .string()
      .oneOf(["PRIVATE", "PUBLIC", "CIRCLE"])
      .test(
        "validatePrivacy",
        "Pls provide a circle or set privacy to PUBLIC or PRIVATE",
        validatePrivacy
      ),
    circleId: yup
      .string()
      .test(
        "validateCircleId",
        "Pls set privacy to CIRCLE if you want to include in a circle",
        validateCircleId
      ),
  });

export type Task = yup.InferType<typeof TaskSchema>;
