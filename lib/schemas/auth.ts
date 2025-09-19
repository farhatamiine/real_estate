import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8).max(32),
    repeatPassword: z.string().min(8).max(32),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(32),
});

export type LoginInput = z.infer<typeof loginSchema>;
