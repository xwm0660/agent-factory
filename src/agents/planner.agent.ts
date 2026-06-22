import { LLM } from "../core/llm.js";
import { PromptManager } from "../core/prompt.js";
import {
  PlannerSchema,
  type PlannerResult,
} from "../schemas/planner.schema.js";
export class PlannerAgent {
  private llm = new LLM();
  private prompt = new PromptManager();

  async run(topic: string[]): Promise<PlannerResult> {
    const promptText = this.prompt.load("planner", {
      topic,
    });

    const result = await this.llm.generate({
      prompt: promptText,
      agent: "PlannerAgent",
    });
    const data = JSON.parse(result);
    return PlannerSchema.parse(data);
  }
}
