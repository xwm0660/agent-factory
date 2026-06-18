// build instance of openai
import { OpenAI } from "openai";
import { config } from "dotenv";

config();
const { OPENAI_API_KEY } = process.env;

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});