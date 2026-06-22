import { ImageTool } from "../tools/image.tool";

export class ImageGeneratorAgent {
  private imageTool = new ImageTool();

  async run(prompts: string[]) {
    const images: string[] = [];

    for (const prompt of prompts) {
      const image = await this.imageTool.generate(prompt);

      images.push(image);

      console.log("image generated:", image);
    }

    return images;
  }
}
