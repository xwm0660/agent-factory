import { ZodSchema } from "zod";
import { deepseekClient } from "../config/providers/deepseek";
import { MODELS } from "../config/models";
import { AIResponseError } from "../shared/error.ts/ai.error";
type GenerateOptions = {
  prompt: string;
  model?: string;
  agent?: string;
};

type GenerateObjectOptions<T> = {
  prompt: string;
  model?: string;
  agent?: string;
  schema: ZodSchema<T>;
};

export class LLM {
  /**
   * 普通文本生成
   */
  async generate(options: GenerateOptions): Promise<string> {
    const start = Date.now();

    console.log("\n================================");
    console.log(`[${options.agent ?? "UnknownAgent"}] START`);
    const response = await deepseekClient.chat.completions.create({
      model: options.model ?? MODELS.CHAT,
      messages: [
        {
          role: "user",
          content: options.prompt,
        },
      ],
    });
    const content = response.choices[0].message.content ?? "";
    const cleanResult = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    console.log(`[${options.agent ?? "UnknownAgent"}] END`);
    console.log(`Duration: ${Date.now() - start}ms`);

    console.log("================================\n");
    return cleanResult;
  }

  /**
   * 结构化输出
   */
  async generateObject<T>(
    options: GenerateObjectOptions<T>,
    retries = 3,
  ): Promise<T> {
    const start = Date.now();

    console.log("\n================================");
    console.log(`[${options.agent ?? "UnknownAgent"}] START`);
    for (let i = 0; i < retries; i++) {
      try {
        const result = await this.generate({
          prompt: options.prompt,
        });
        const json = JSON.parse(result);
        return options.schema.parse(json);
      } catch (error) {
        if (i === retries - 1) {
          throw new AIResponseError("AI returned invalid response", {
            cause: error,
          });
        }
      }
    }
    console.log(`[${options.agent ?? "UnknownAgent"}] END`);
    console.log(`Duration: ${Date.now() - start}ms`);

    console.log("================================\n");
    throw new AIResponseError("Unknown AI error");
  }
}
