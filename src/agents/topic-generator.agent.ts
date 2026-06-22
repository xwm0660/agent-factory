import { LLM } from "../core/llm.js";
import { PromptManager } from "../core/prompt.js";
import {
  TopicGeneratorSchema,
  type TopicGeneratorResult,
} from "../schemas/topic-generator.schema.js";
export class TopicGeneratorAgent {
  private llm = new LLM();
  private prompt = new PromptManager();
  async run(topic: string): Promise<TopicGeneratorResult> {
    const promptText = this.prompt.load("topic-generator", {
      category: topic,
    });

    const result = await this.llm.generate({
      prompt: promptText,
      agent: "TopicGeneratorAgent",
    });
    console.log("result1", result);
    const data = JSON.parse(result);
    console.log("result2", data);
    return TopicGeneratorSchema.parse(data);
  }
}
