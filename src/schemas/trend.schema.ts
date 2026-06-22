import { z } from "zod";

export const TrendSchema = z.object({
  topics: z.array(z.string()),
});

export type TrendResult =
  z.infer<typeof TrendSchema>;