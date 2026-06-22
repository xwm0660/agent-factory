import { LLM } from "../core/llm";
import { PromptManager } from "../core/prompt";
import type { PlannerResult } from "../schemas/planner.schema";

import { WriterSchema, type WriterResult } from "../schemas/writer.schema";

export class WriterAgent {
  private llm = new LLM();
  private prompt = new PromptManager();

  async run(plan: PlannerResult): Promise<WriterResult> {
    const promptText = this.prompt.load("writer", {
      title: plan.title,
      angle: plan.angle,
      story: plan.story,
    });
    const result = await this.llm.generateObject({
      prompt: promptText,
      schema: WriterSchema,
      agent: "WriterAgent",
    });
    return WriterSchema.parse(result);
  }
}
