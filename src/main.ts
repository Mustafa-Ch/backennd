import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
const server = express();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
   app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
