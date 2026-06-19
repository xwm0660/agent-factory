import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const deepseekClient = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});