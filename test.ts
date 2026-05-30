import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const provider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const result = await generateText({
  model: provider("openrouter/free"),
  prompt: "hello"
});

console.log(result.text);