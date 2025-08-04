import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { PlansModule } from './plans/plans.module';
import { ChatModule } from './chat/chat.module';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SpeechModule } from './speech/speech.module';
import { getOpenAIClient } from '../utils/openai';


@Module({
  imports: [
   TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoLoadEntities:true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
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
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    getOpenAIClient(this.configService); // init once during boot
  }
}
