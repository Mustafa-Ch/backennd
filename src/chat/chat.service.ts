import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { User } from '../user/entities/user.entity';
import { ChatMessageDto } from './dto/create-chat.dto';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async processPrompt(dto: ChatMessageDto, userId: string) {
    const { prompt, threadId } = dto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const systemPrompt = `
You are BOOKD, a high-end AI assistant for booking. Understand natural-language input and reply like a friendly, luxury assistant. Then return a JSON block inside a comment for backend logic.

Reply format:
- First, respond conversationally.
- Then include parsed intent and details as a JSON block inside a comment.

Example:
You're booked at Carbone at 7PM for 2 people.
<!--
{
  "intent": "restaurant_booking",
  "restaurant": "Carbone",
  "datetime": "2025-08-01T19:00:00",
  "guests": 2
}
-->

If anything is unclear, ask the user politely.
`;

    const chatResponse = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4',
    });

    const responseText =
      chatResponse.choices?.[0]?.message?.content || 'No response.';

    const jsonMatch = responseText.match(/<!--\s*({[\s\S]*?})\s*-->/);
    const parsedIntent = jsonMatch ? JSON.parse(jsonMatch[1]) : null;

    const chat = this.chatRepository.create({
      prompt,
      response: responseText,
      threadId,
      parsedIntent,
      user,
    });

    return this.chatRepository.save(chat);
  }
}
