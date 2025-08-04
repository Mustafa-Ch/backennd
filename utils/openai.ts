// openai-client.ts
import OpenAI from 'openai';

let openaiInstance: OpenAI | null = null;

export const getOpenAIClient = (): OpenAI => {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined in environment variables.');
    }

    openaiInstance = new OpenAI({ apiKey });
  }

  return openaiInstance;
};
