import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  UseGuards
} from '@nestjs/common';

import {
  TarefasService
} from './tarefas.service';

import {
  StatusTarefa
} from './tarefa.interface';

import {
  TarefaEntity
} from './entities/tarefa.entity';

import {
  Roles
} from '../auth/roles.decorator';

import {
  Role
} from '../usuarios/entities/usuario.entity';

import {
  JwtAuthGuard
} from '../auth/jwt-auth.guard';

import {
  RolesGuard
} from '../auth/roles.guard';

@Controller('tarefas')
@UseGuards(JwtAuthGuard)
export class TarefasController {

  constructor(
    private readonly tarefasService: TarefasService
  ) {}

  // =====================================================
  // LISTAR TAREFAS
  // =====================================================

  @Get()
  async findAll(
    @Query('status') status?: StatusTarefa,
    @Query('prioridade') prioridade?: string
  ): Promise<TarefaEntity[]> {

    return await this.tarefasService.buscarComFiltros(
      status,
      prioridade
    );
  }

  // =====================================================
  // BUSCAR UMA TAREFA
  // =====================================================

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe()
    )
    id: string
  ) {

    return await this.tarefasService.findOne(id);
  }

  // =====================================================
  // CRIAR TAREFA
  // =====================================================

  @Post()
  async create(
    @Body()
    tarefaData: Partial<TarefaEntity>
  ): Promise<TarefaEntity> {

    return await this.tarefasService.create(
      tarefaData
    );
  }

  // =====================================================
  // ATUALIZAR TAREFA
  // =====================================================

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    tarefaData: Partial<TarefaEntity>
  ): Promise<TarefaEntity> {

    return await this.tarefasService.update(
      id,
      tarefaData
    );
  }

  // =====================================================
  // EXCLUIR TAREFA
  // SOMENTE ADMIN
  // =====================================================

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(
    JwtAuthGuard,
    RolesGuard
  )
  @Roles(Role.ADMIN)
  async remove(
    @Param('id') id: string
  ): Promise<void> {

    await this.tarefasService.remove(id);
  }
}