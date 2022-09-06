import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

import { AppModule } from './app.module';

config();

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

  await app.listen();
}

bootstrap();
