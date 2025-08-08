import { z } from "zod";
export const signUpSchema = z.object({
  username: z.email(),
  password: z.string().min(8).max(20),
  name: z.string().min(8).max(20),
});

export const signInSchema = z.object({
  username: z.email(),
  password: z.string().min(8).max(20),
});
