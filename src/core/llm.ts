// import { openai } from "../config/openai";
// import { MODELS } from "../constants/models";




// interface GenerateOptions {
//   model?: string;
//   prompt: string;
// }

// export class LLM {
//   async generate(options: GenerateOptions) : Promise<string>{
//     const result = await openai.responses.create({
//       model: options.model ?? MODELS.DEFAULT,
//       input: options.prompt,
//     });
//     return result.output_text;
//   }
// }




import { deepseekClient } from "../config/providers/deepseek";
import { MODELS } from "../constants/models";

type GenerateOptions = {
  prompt: string;
  model?: string;
};

export class LLM {
  async generate(options: GenerateOptions): Promise<string> {
    const response = await deepseekClient.chat.completions.create({
      model: options.model ?? MODELS.CHAT,
      messages: [
        {
          role: "user",
          content: options.prompt,
        },
      ],
    });

    return response.choices[0].message.content ?? "";
  }
}