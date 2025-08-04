import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConfigModule } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { AuthMiddleware } from '../../utils/middleware';

@Module({
  imports: [ConfigModule,TypeOrmModule.forFeature([Chat, User]), AuthModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ChatController);
  }
}
