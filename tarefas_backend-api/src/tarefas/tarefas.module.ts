

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';
import { TarefaEntity } from './entities/tarefa.entity';

@Module({
  imports: [
    // Torna o repositório do TarefaEntity disponível para injeção de dependência neste módulo
    TypeOrmModule.forFeature([TarefaEntity]),
  ],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
  






  // import { Module } from '@nestjs/common';
  // import { TarefasController } from './tarefas.controller';
  // import { TarefasService } from './tarefas.service';
  
  // @Module({
  //   controllers: [TarefasController],
  //   providers: [TarefasService]
  // })
  // export class TarefasModule { }
