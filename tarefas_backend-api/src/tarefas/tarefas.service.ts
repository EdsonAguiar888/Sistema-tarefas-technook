

import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusTarefa, Tarefa, } from './tarefa.interface';
import { v4 as uuidv4 } from 'uuid';
import { ok } from 'assert';
import { TarefaEntity } from './entities/tarefa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TarefasService {


    // ---------------------------------------------------------------------------
    // Injeta o repositório do TypeORM para a entidade TarefaEntity.
    // É ele quem executa os comandos SQL (SELECT, INSERT, UPDATE, DELETE).
    // ---------------------------------------------------------------------------
    constructor(
        @InjectRepository(TarefaEntity)
        private readonly tarefaRepository: Repository<TarefaEntity>,
    ) { }



    // 1. BUSCAR TODAS AS TAREFAS (SELECT * FROM tarefas)
    async findAll(): Promise<TarefaEntity[]> {
        return await this.tarefaRepository.find();
    }


    // 2. BUSCAR UMA TAREFA POR ID (SELECT * FROM tarefas WHERE id = ?)
    async findOne(id: string): Promise<TarefaEntity> {
        const tarefa = await this.tarefaRepository.findOne({ where: { id } });
        if (!tarefa) {
            throw new NotFoundException(`Tarefa com ID "${id}" não encontrada.`);
        }
        return tarefa;
    }


    // 3. CRIAR UMA NOVA TAREFA (INSERT INTO tarefas ...)
    async create(tarefaData: Partial<TarefaEntity>): Promise<TarefaEntity> {
        const novaTarefa = this.tarefaRepository.create(tarefaData);
        return await this.tarefaRepository.save(novaTarefa);
    }


    // 4. ATUALIZAR UMA TAREFA (UPDATE tarefas SET ... WHERE id = ?)
    async update(id: string, tarefaData: Partial<TarefaEntity>): Promise<TarefaEntity> {
        const tarefa = await this.findOne(id); // Garante que a tarefa existe
        Object.assign(tarefa, tarefaData);
        return await this.tarefaRepository.save(tarefa);
    }


    async remove(id: string): Promise<void> {
        const tarefa = await this.findOne(id);
        await this.tarefaRepository.remove(tarefa);
    }






    



    // private tarefas: Tarefa[] = [

    //     {
    //         id: "1",
    //         titulo: "Teste",
    //         descricao: "Teste",
    //         prioridade: "alta",
    //         status: StatusTarefa.CONCLUIDA
    //     }

    // ];



    // listarTodas(): Tarefa[] {
    //     return this.tarefas;
    // }

    // 5. REMOVER UMA TAREFA (DELETE FROM tarefas WHERE id = ?)


    // buscarPorStatus(status: StatusTarefa): Tarefa[] {
    //     return this.tarefas.filter(t => t.status === status);
    // }





    // buscarComFiltros(status?: StatusTarefa, prioridade?: string): Tarefa[] {

    //     return this.tarefas.filter(tarefa => {

    //         const bateuStatus = status ? tarefa.status === status : true;

    //         const bateuPrioridade = prioridade ? tarefa.prioridade === prioridade : true;

    //         return bateuStatus && bateuPrioridade;
    //     });
    // }



    // buscarPorId(id: string): Tarefa | undefined {   // Esta dando erro no return informando que tarefa nao pode ser underf
    //     return this.tarefas.find(t => t.id === id);
    // }


    // criar(titulo: string, descricao: string, prioridade: string, status: string): Tarefa {

    //     const tarefa: Tarefa = {
    //         id: uuidv4(),
    //         titulo,
    //         descricao,
    //         prioridade,
    //         status: (status as StatusTarefa) || StatusTarefa.ABERTA
    //     }

    //     this.tarefas.push(tarefa);
    //     return tarefa;
    // }


    // deletar(id: string): void {
    //     this.tarefas = this.tarefas.filter(t => t.id !== id);
    // }


    // atualizar(id: string, dadosAtualizados: Partial<Tarefa>): Tarefa {
    //     // 1. Procura a posição da tarefa no array pelo ID
    //     const index = this.tarefas.findIndex((t) => t.id === id);

    //     // 2. Se a tarefa não existir, dispara um erro HTTP 404 (Not Found)
    //     if (index === -1) {
    //         throw new NotFoundException(`Tarefa com o ID ${id} não encontrada.`);
    //     }

    //     // 3. Mescla os dados antigos com os novos dados recebidos
    //     this.tarefas[index] = {
    //         ...this.tarefas[index],
    //         ...dadosAtualizados,
    //         // Garante a conversão do enum caso o status venha como string
    //         status: dadosAtualizados.status
    //             ? (dadosAtualizados.status as StatusTarefa)
    //             : this.tarefas[index].status,
    //     };

    //     // 4. Retorna a tarefa atualizada
    //     return this.tarefas[index];
    // }




}