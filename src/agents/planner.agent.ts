import { LLM } from "../core/llm.js";
import { PromptManager } from "../core/prompt.js";
import { VideoIdea } from "../types/video.js";

export class PlannerAgent {
  private llm = new LLM();
  private prompt = new PromptManager();

  async run(topic: string): Promise<VideoIdea> {
    const promptText = this.prompt.load("planner", {
      topic,
    });

    const result = await this.llm.generate({
      prompt: promptText,
    });

    return {
      title: "（暂时先用原始输出）",
      angle: "",
      story: result,
    };
  }
}