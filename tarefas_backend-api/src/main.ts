// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors();
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();






// src/main.ts — habilitar CORS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(3000);
  console.log('API rodando em http://localhost:3000');
}
bootstrap();