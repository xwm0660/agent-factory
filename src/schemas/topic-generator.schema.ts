import { z } from "zod";

export const TopicGeneratorSchema = z.object({
  topics: z.array(z.string()),
});

export type TopicGeneratorResult = z.infer<typeof TopicGeneratorSchema>;
