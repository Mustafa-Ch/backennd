import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { PlansModule } from './plans/plans.module';
import { ChatModule } from './chat/chat.module';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { ConfigModule } from '@nestjs/config';
import { SpeechModule } from './speech/speech.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'bookd',
      database: 'bookd',
      entities: [__dirname + '/../**/*.entity.{ts,js}'],

      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    SettingsModule,
    PlansModule,
    ChatModule,
    GoogleCalendarModule,
    SpeechModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
