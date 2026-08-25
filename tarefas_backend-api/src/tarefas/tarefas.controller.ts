


import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { StatusTarefa, Tarefa } from './tarefa.interface';
import { TarefaEntity } from './entities/tarefa.entity';
// import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../usuarios/entities/usuario.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tarefas')
@UseGuards(JwtAuthGuard)
// @UseGuards(AuthGuard('jwt')) // 👈 Valida o Token JWT em todas as rotas de tarefas
export class TarefasController {
  
  // 2: Injeção de Dependência via Construtor.
  // O NestJS cria automaticamente uma instância do TarefasService e passa aqui.
  // O 'private readonly' cria a propriedade no controller e impede reatribuições.
  constructor(private readonly tarefasService: TarefasService) { }
  
  
    
  // ---------------------------------------------------------------------------
  // 1. LISTAR TODAS AS TAREFAS (GET /tarefas)
  // ---------------------------------------------------------------------------
  
  
  @Get()
    async buscarComFiltros(
    @Query('status') status?: StatusTarefa,
    @Query('prioridade') prioridade?: string,
  ) {
      return await this.tarefasService.buscarComFiltros(status, prioridade);
  }


  // Tanto ADMIN quanto USUARIO comum podem listar tarefas
  @Get()
  async findAll(): Promise<TarefaEntity[]> {
    // Chama o método findAll() do service, que executa o SELECT * no MySQL
    return await this.tarefasService.findAll();
    console.log(this.tarefasService)
  }


  @Get(':id')
  async findOne(@Param('id' , new ParseUUIDPipe())  id: string) {    
    return await this.tarefasService.findOne(id);    
  }



  // ---------------------------------------------------------------------------
  // 3. CRIAR UMA NOVA TAREFA (POST /tarefas)
  // ---------------------------------------------------------------------------
  @Post()
  async create(@Body() tarefaData: Partial<TarefaEntity>): Promise<TarefaEntity> {
    // o decorator @Body extrai o JSON enviado no corpo da requisição HTTP
    return await this.tarefasService.create(tarefaData);
    console.log(tarefaData)
    console.log(this.tarefasService)
  }


  // ---------------------------------------------------------------------------
  // 4. ATUALIZAR UMA TAREFA EXISTENTE (PUT /tarefas/:id)
  // ---------------------------------------------------------------------------
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() tarefaData: Partial<TarefaEntity> 
  ): Promise<TarefaEntity> {
    // Passa o ID da URL e os novos dados do body para o service
    return await this.tarefasService.update(id, tarefaData);  
    }



  // ---------------------------------------------------------------------------
  // 5. DELETAR UMA TAREFA (DELETE /tarefas/:id)
  // ---------------------------------------------------------------------------
  
  // Apenas administradores podem excluir
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna status HTTP 204 (sem conteudo) ao deletar
  @Roles(Role.ADMIN) // Apenas administradores podem excluir
  async remove(@Param('id') id: string): Promise<void> {
    await this.tarefasService.remove(id);
  }









  // ---------------------------------------------------------------------------
  // CODIGO UTILIZA ARRAY COMO BANCO DE DADOS
  // ---------------------------------------------------------------------------

    // @Get()
  // listar(
  //   @Query('status') status?: StatusTarefa,
  //   @Query('prioridade') prioridade?: string,
  // ): Tarefa[] {

  //   // Se passou status ou prioridade, aplica o filtro no service
  //   if (status || prioridade) {
  //     return this.tarefasService.buscarComFiltros(status, prioridade);
  //   }
  //   return this.tarefasService.listarTodas();
  // }



  // @Get()
  // listarTodas() {
  //   return this.tarefasService.listarTodas();
  // }

  // @Get(':id')
  // buscarPorId(@Param('id') id: string) {
  //   return this.tarefasService.buscarPorId(id);
  // }

  // @Post()
  // criar(@Body() body: { titulo: string; descricao: string; prioridade: string; status: string; }) {
  //   // console.log('Body recebido no Controller:' , body);
  //   return this.tarefasService.criar(body.titulo, body.descricao, body.prioridade, body.status);
  // }

  // @Delete(':id')
  // deletar(@Param('id') id: string) {
  //   this.tarefasService.deletar(id);
  // }

  // @Put(':id')
  // atualizar(
  //   @Param('id') id: string,
  //   @Body() body: { titulo?: string; descricao?: string; prioridade?: string; status?: StatusTarefa }
  // ) {
  //   return this.tarefasService.atualizar(id, body);
  // }


}