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
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
    autoLoadEntities: true,
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
