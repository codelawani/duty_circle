import * as z from "zod";

export const Task = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  status: z.enum(["PENDING", "COMPLETED"]),
  privacy: z.enum(["PRIVATE", "PUBLIC", "CIRCLE"]),
  consequence: z.string().optional(),
  userId: z.string(),
  circleId: z.string().optional(),
});

export type TaskSchema = z.infer<typeof Task>;
