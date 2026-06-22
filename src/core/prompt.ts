import fs from "fs";
import path from "path";

type PromptVariables = Record<string, unknown>;

export class PromptManager {
  private basePath = path.resolve("src/prompts");

  load(
    name: string,
    variables?: PromptVariables
  ): string {
    const filePath = path.join(
      this.basePath,
      `${name}.md`
    );

    let content = fs.readFileSync(
      filePath,
      "utf-8"
    );

    if (!variables) {
      return content;
    }

    for (const key in variables) {
      const value = variables[key];

      let replacement: string;

      if (Array.isArray(value)) {
        replacement = value.join("\n");
      } else if (
        value !== null &&
        typeof value === "object"
      ) {
        replacement = JSON.stringify(
          value,
          null,
          2
        );
      } else {
        replacement = String(value);
      }

      content = content.replace(
        new RegExp(`{{${key}}}`, "g"),
        replacement
      );
    }

    return content;
  }
}