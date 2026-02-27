import z from "zod";

export type Column = "backlog" | "in-progress" | "review" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  column?: Column;
};

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be 3 characters at least"),
  description: z
    .string()
    .max(300, { error: "Maximum number of letters is 300..." }),
  column: z.enum(["backlog", "in-progress", "review", "done"]),
});
export type TaskSchemaType = z.infer<typeof taskSchema>;
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z.string().trim().toLowerCase().email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .regex(/[0-9]/, "Must contain at least one number"),
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export const loginSchema = z
  .object({
    email: z.string().trim().toLowerCase().email("Invalid email format"),

    password: z.string().min(1, "Password is required"),
  })
  .strict();

export type LoginSchemaType = z.infer<typeof loginSchema>;
