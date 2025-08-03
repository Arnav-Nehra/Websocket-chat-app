import { z } from "zod";

export const signUpSchema = z.object({
  username: z.email(),
  password: z.string().min(8).max(20),
});
