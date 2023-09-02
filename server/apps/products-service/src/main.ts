import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ProductsServiceModule } from './products-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsServiceModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT');
  const ORIGINS = configService.get('ORIGINS');

  app.use(cookieParser());

  app.enableCors({ origin: ORIGINS, credentials: true });
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
