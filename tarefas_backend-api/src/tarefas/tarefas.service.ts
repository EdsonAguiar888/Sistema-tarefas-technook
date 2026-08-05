

import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusTarefa, Tarefa } from './tarefa.interface';
import { v4 as uuidv4 } from 'uuid';
import { ok } from 'assert';

@Injectable()
export class TarefasService {

    private tarefas: Tarefa[] = [

        {
            id: "1",
            titulo: "Teste",
            descricao: "Teste",
            prioridade: "alta",
            status: StatusTarefa.CONCLUIDA
        }

    ];

    listarTodas(): Tarefa[] {
        return this.tarefas;
    }




    buscarPorStatus(status: StatusTarefa): Tarefa[] {
        return this.tarefas.filter(t => t.status === status);
    }


    buscarComFiltros(status?: StatusTarefa, prioridade?: string): Tarefa[] {

        return this.tarefas.filter(tarefa => {

            const bateuStatus = status ? tarefa.status === status : true;

            const bateuPrioridade = prioridade ? tarefa.prioridade === prioridade : true;

            return bateuStatus && bateuPrioridade;
        });
    }



    buscarPorId(id: string): Tarefa | undefined {   // Esta dando erro no return informando que tarefa nao pode ser underf
        return this.tarefas.find(t => t.id === id);
    }


    criar(titulo: string, descricao: string, prioridade: string, status: string): Tarefa {

        const tarefa: Tarefa = {
            id: uuidv4(),
            titulo,
            descricao,
            prioridade,
            status: (status as StatusTarefa) || StatusTarefa.ABERTA
        }

        this.tarefas.push(tarefa);
        return tarefa;
    }


    deletar(id: string): void {
        this.tarefas = this.tarefas.filter(t => t.id !== id);
    }


    atualizar(id: string, dadosAtualizados: Partial<Tarefa>): Tarefa {
        // 1. Procura a posição da tarefa no array pelo ID
        const index = this.tarefas.findIndex((t) => t.id === id);

        // 2. Se a tarefa não existir, dispara um erro HTTP 404 (Not Found)
        if (index === -1) {
            throw new NotFoundException(`Tarefa com o ID ${id} não encontrada.`);
        }

        // 3. Mescla os dados antigos com os novos dados recebidos
        this.tarefas[index] = {
            ...this.tarefas[index],
            ...dadosAtualizados,
            // Garante a conversão do enum caso o status venha como string
            status: dadosAtualizados.status
                ? (dadosAtualizados.status as StatusTarefa)
                : this.tarefas[index].status,
        };

        // 4. Retorna a tarefa atualizada
        return this.tarefas[index];
    }




}