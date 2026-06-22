import { LLM } from "../core/llm";
import { PromptManager } from "../core/prompt";
import {
  ImagePromptSchema,
  type ImagePromptResult,
} from "../schemas/image-prompt.schema";

import { type WriterResult } from "../schemas/writer.schema";

export class ImageAgent {
  private llm = new LLM();
  private prompt = new PromptManager();
  async run(writer: WriterResult): Promise<ImagePromptResult> {
    const promptText = this.prompt.load("image-prompt", {
      title: writer.title,
      script: writer.script.join("\n"),
    });
    const result = await this.llm.generateObject({
      prompt: promptText,
      schema: ImagePromptSchema,
      agent: "ImagePromptAgent",
    });
    return ImagePromptSchema.parse(result);
  }
}
