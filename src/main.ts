import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`,
        ],
        queue: 'kitchen_queue',
        queueOptions: {
          durable: process.env.NODE_ENV === 'production',
        },
      },
    },
  );

  await app.listen();
  console.log('Kitchen service is listening on kitchen_queue');
}
bootstrap();
