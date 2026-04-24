import { Handler } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from '@codegenie/serverless-express';
import { AppModule } from '../src/app.module';

const expressApp = express();
let cached: Handler;

async function bootstrap() {
  if (!cached) {
    const nest = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    nest.enableCors({
      origin: (process.env.CORS_ORIGIN ?? '*').split(',').map((origin) => origin.trim()),
      credentials: true,
    });
    nest.setGlobalPrefix('api');
    await nest.init();
    cached = serverlessExpress({ app: expressApp });
  }

  return cached;
}

const handler: Handler = async (req, res) => {
  const server = await bootstrap();
  return server(req, res);
};

export default handler;
