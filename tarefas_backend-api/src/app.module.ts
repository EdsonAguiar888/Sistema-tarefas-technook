import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefasModule } from './tarefas/tarefas.module';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TarefasModule,
            // TypeOrmModule.forRoot({
            //   type: 'mysql',
            //   host: process.env.DB_HOST || 'localhost',
            //   port: 3306,
            //   username: process.env.DB_USER || 'root',
            //   password: process.env.DB_PASS || 'senha123',
            //   database: process.env.DB_NAME || 'tarefas_db',
            //   autoLoadEntities: true,
            //   synchronize: true,   // NÃO usar em produção!
            // }),
            TarefasModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
