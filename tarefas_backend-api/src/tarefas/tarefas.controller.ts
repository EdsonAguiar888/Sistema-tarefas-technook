


import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { StatusTarefa, Tarefa } from './tarefa.interface';


@Controller('tarefas')
export class TarefasController {
  constructor(private tarefasService: TarefasService) { }




  //=============================================================================

  @Get()
  listar(
    @Query('status') status?: StatusTarefa,
    @Query('prioridade') prioridade?: string,
  ): Tarefa[] {

    // Se passou status ou prioridade, aplica o filtro no service
    if (status || prioridade) {
      return this.tarefasService.buscarComFiltros(status, prioridade);
    }
    return this.tarefasService.listarTodas();
  }

  //=============================================================================


  @Get()
  listarTodas() {
    return this.tarefasService.listarTodas();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.tarefasService.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: { titulo: string; descricao: string; prioridade: string; status: string; }) {
    console.log('Body recebido no Controller:' , body);
    return this.tarefasService.criar(body.titulo, body.descricao, body.prioridade, body.status);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    this.tarefasService.deletar(id);
  }
}