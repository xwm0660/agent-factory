import { PlannerAgent } from "../agents/planner.agent";
import { WriterAgent } from "../agents/writer.agent";
import { ImageAgent } from "../agents/image-prompt.agent";
import { TopicGeneratorAgent } from "../agents/topic-generator.agent";
import { ImageGeneratorAgent } from "../agents/image-generator.agent";
export async function main() {
  const planner = new PlannerAgent();
  const writer = new WriterAgent();
  const imagePrompt = new ImageAgent();
  const topicGenerator = new TopicGeneratorAgent();
  const imageGenerator = new ImageGeneratorAgent();
  const topics = await topicGenerator.run("程序员");
  const plan = await planner.run(topics.topics);
  const script = await writer.run(plan);
  const images = await imagePrompt.run(script);
  const imageFiles = await imageGenerator.run(images.prompts);
  console.log("imageFiles", imageFiles);
  return imageFiles;
}
