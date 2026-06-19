import fs from "fs";
import path from "path";

type PromptVariables = Record<string, string>;

export class PromptManager {
  private basePath = path.resolve("src/prompts");

  load(name: string, variables?: PromptVariables): string {
    const filePath = path.join(this.basePath, `${name}.md`);
    let content = fs.readFileSync(filePath, "utf-8");

    if (variables) {
      for (const key in variables) {
        content = content.replace(
          new RegExp(`{{${key}}}`, "g"),
          variables[key]
        );
      }
    }

    return content;
  }
}