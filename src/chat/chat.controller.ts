import { Controller, Post, Body, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() dto: ChatMessageDto, @Req() req: any) {
    const userId = req.user?.id;
    return this.chatService.processPrompt(dto, userId);
  }
}
