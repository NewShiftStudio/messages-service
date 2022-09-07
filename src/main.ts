import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as Sentry from '@sentry/node';
import { config } from 'dotenv';

import { AppModule } from './app.module';
import { getRequiredEnvsByNodeEnv } from './common/utils/getRequiredEnvsByNodeEnv';
import { NodeEnv } from './common/types/App';

config();

const envs = [
  'PORT',
  'NODE_ENV',
  'SMS_SERVICE_API_KEY',
  'EMAIL_AUTH_USER',
  'EMAIL_AUTH_PASSWORD',
  'EMAIL_SERVICE',
];

const requiredEnvs = getRequiredEnvsByNodeEnv(
  { common: envs, development: ['SENTRY_DSN'], production: ['SENTRY_DSN'] },
  process.env.NODE_ENV as NodeEnv,
);

requiredEnvs.forEach((envKey) => {
  if (!process.env[envKey]) {
    throw new Error(`Added ${envKey} to .env file !!`);
  }
});

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: +process.env.PORT,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());

  if (['production', 'development'].includes(process.env.NODE_ENV)) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
    });
  }

  await app.listen();
  console.log('MESSAGES SERVICE LISTEN: ' + process.env.PORT);
}

bootstrap();
