


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefasModule } from './tarefas/tarefas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Conecta o NestJS ao banco MySQL usando as variáveis de ambiente do Docker
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST || 'localhost',
      host: process.env.DB_HOST || 'postgres_db',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'tecnook',
      password: process.env.DB_PASS || '12345',
      database: process.env.DB_NAME || 'technook_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Carrega todas as entidades automaticamente
      synchronize: true, // Em desenvolvimento, cria as tabelas automaticamente no banco!
      logging: true,
    }),
    TarefasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


