import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
const port = process.env.HTTP_PORT || 5030;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  await app.listen(port).then(() => {
    new Logger().log(port, 'Server Port');
  });
}
bootstrap();
