import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
 
@Controller('tarefas')
export class TarefasController {
  constructor(private tarefasService: TarefasService) {}
 
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