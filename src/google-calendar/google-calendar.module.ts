import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CalendarService } from './google-calendar.service';
import { GoogleCalendarController } from './google-calendar.controller';
import { AuthMiddleware } from 'utils/middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleCalendarToken } from './entities/google-calendar.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleCalendarToken, User]), AuthModule],
  controllers: [GoogleCalendarController],
  providers: [CalendarService],
})
export class GoogleCalendarModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(GoogleCalendarController);
  }
}



