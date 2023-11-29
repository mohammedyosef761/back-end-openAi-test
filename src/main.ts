import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { UserService } from './users/user.services';
import { User } from './users/user.entity';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
