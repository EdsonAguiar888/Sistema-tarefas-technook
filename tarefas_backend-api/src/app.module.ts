


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
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'technook_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Carrega todas as entidades automaticamente
      synchronize: true, // Em desenvolvimento, cria as tabelas automaticamente no banco!
    }),
    TarefasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


