import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_FILTER } from '@nestjs/core';
import { config } from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsSenderModule } from './features/sms-sender/sms-sender.module';
import { EmailSenderModule } from './features/email-sender/email-sender.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

config();

const requiredEnvs = [
  'PORT',
  'EMAIL_SERVICE',
  'EMAIL_AUTH_USER',
  'EMAIL_AUTH_PASSWORD',
  'SMS_SERVICE_API_KEY',
];

requiredEnvs.forEach((envKey) => {
  if (!process.env[envKey]) {
    throw new Error(`Added ${envKey} to .env file !!`);
  }
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASSWORD,
        },
      },
    }),
    SmsSenderModule,
    EmailSenderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
