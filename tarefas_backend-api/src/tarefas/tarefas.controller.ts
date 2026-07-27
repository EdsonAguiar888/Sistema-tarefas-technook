import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { StatusTarefa, Tarefa } from './tarefa.interface';


@Controller('tarefas')
export class TarefasController {
  constructor(private tarefasService: TarefasService) {}


@Get() // Ouve GET em '/tarefas' e também em '/tarefas?status=ABERTA'
  listar(@Query('status') status: StatusTarefa): Tarefa[] {
    
    if (status) {
      return this.tarefasService.buscarPorStatus(status);
    }

    
    return this.tarefasService.listarTodas();
  }


 
  @Get()
  listarTodas() {
    return this.tarefasService.listarTodas();
  }
 
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.tarefasService.buscarPorId(id);
  }
 
  @Post()
  criar(@Body() body: { titulo: string; descricao: string }) {
    return this.tarefasService.criar(body.titulo, body.descricao);
  }

    @Delete(':id')
  deletar(@Param('id') id: string) {
    this.tarefasService.deletar(id);
  }
}