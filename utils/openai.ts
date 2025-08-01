import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

let openaiInstance: OpenAI;

export const getOpenAIClient = (configService: ConfigService): OpenAI => {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
  }
  return openaiInstance;
};
