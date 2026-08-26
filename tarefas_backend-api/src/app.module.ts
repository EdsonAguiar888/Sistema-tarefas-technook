import {
  Module
} from '@nestjs/common';

import {
  AppController
} from './app.controller';

import {
  AppService
} from './app.service';

import {
  TarefasModule
} from './tarefas/tarefas.module';

import {
  TypeOrmModule
} from '@nestjs/typeorm';

import {
  AuthModule
} from './auth/auth.module';

@Module({

  imports: [

    TypeOrmModule.forRoot({

      type: 'postgres',

      host:
        process.env.DB_HOST ||
        'postgres_db',

      port:
        Number(process.env.DB_PORT) ||
        5432,

      username:
        process.env.DB_USER ||
        'tecnook',

      password:
        process.env.DB_PASS ||
        '12345',

      database:
        process.env.DB_NAME ||
        'technook_db',

      entities: [
        __dirname +
        '/**/*.entity{.ts,.js}'
      ],

      synchronize: true,

      logging: true

    }),

    TarefasModule,

    AuthModule

  ],

  controllers: [
    AppController
  ],

  providers: [
    AppService
  ]

})
export class AppModule {}