import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

const server = express();
server.use(cookieParser());

let isInitialized = false;

async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  await app.init();
}

export default async function handler(req: Request, res: Response) {
  if (!isInitialized) {
    await createNestServer(server);
    isInitialized = true;
  }
  return server(req, res); // proxy request
}
