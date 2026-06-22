import { z } from "zod";

export const ContentSchema = z.object({
  idea: z.any(),
  script: z.any(),
  images: z.any(),
});