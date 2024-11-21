import { ValidationPipe } from '@nestjs/common'  ;

import { NestFactory } from '@nestjs/core'  ;

import { AppModule } from './app.module'  ;

import { ConfigService } from '@nestjs/config';

async function bootstrap() { 

  const app = await NestFactory.create( AppModule )  ;

  app.enableCors();

  const configService = app.get( ConfigService )  ;

  const port = configService.get<number>('PORT') || 4000  ;

  app.useGlobalPipes( new ValidationPipe() )  ;

  await app.listen( port )  ;
  
}

bootstrap()  ;
