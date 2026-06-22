import axios from "axios";
import fs from "fs";
import path from "path";
import { IMAGE_MODELS } from "../config/image-models";

export class ImageTool {
  async generate(prompt: string) {
    try {
      const response = await axios.post(
        "https://api.siliconflow.cn/v1/images/generations",
        {
          model: IMAGE_MODELS.Z_IMAGE_TURBO,
          prompt,
          image_size: "1024x1024",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const imageUrl = response.data.images[0].url;

      const imageBuffer = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      const fileName = `${Date.now()}.png`;

      const outputPath = path.resolve("output/images", fileName);

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      fs.writeFileSync(outputPath, imageBuffer.data);

      return outputPath;
    } catch (error) {
      console.log("status", error.response?.status);
      console.log("data", error.response?.data);
    }
  }
}
