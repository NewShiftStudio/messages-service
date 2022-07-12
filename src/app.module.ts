import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsSenderModule } from './sms-sender/sms-sender.module';
import { EmailSenderModule } from './email-sender/email-sender.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { MailerModule } from '@nestjs-modules/mailer';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        service: process.env.MAILER_SERVICE,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD,
        },
      },
    }),
    SmsSenderModule,
    EmailSenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
