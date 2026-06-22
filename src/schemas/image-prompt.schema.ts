import { z } from "zod";

export const ImagePromptSchema = z.object({
  prompts: z.array(z.string()),
});

export type ImagePromptResult =
  z.infer<typeof ImagePromptSchema>;