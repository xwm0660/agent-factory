import OpenAI, { type ClientOptions } from "openai";
import { config } from "dotenv";
import { ProxyAgent, fetch } from "undici";

config();

const proxyUrl = process.env.HTTPS_PROXY ?? "http://127.0.0.1:7897";
const dispatcher = new ProxyAgent(proxyUrl);

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  fetch: fetch as unknown as NonNullable<ClientOptions["fetch"]>,
  fetchOptions: {
    dispatcher,
  },
});
