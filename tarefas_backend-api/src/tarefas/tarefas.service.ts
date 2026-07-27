import { Injectable } from '@nestjs/common';
import { StatusTarefa, Tarefa } from './tarefa.interface';
import { v4 as uuidv4 } from 'uuid';
import { ok } from 'assert';

@Injectable()
export class TarefasService {

    private tarefas: Tarefa[] = [

        {
            id: "1",
            titulo: "top",
            descricao: "ok",
            status: StatusTarefa.CONCLUIDA
        }

    ];

    listarTodas(): Tarefa[] {
        return this.tarefas;
    }




    buscarPorStatus(status: StatusTarefa): Tarefa[] {
        return this.tarefas.filter(t => t.status === status);
    }







    buscarPorId(id: string): Tarefa | undefined {   // Esta dando erro no return informando que tarefa nao pode ser underf
        return this.tarefas.find(t => t.id === id);
    }


    criar(titulo: string, descricao: string): Tarefa {

        const tarefa: Tarefa = {
            id: uuidv4(),
            titulo,
            descricao,
            status: StatusTarefa.ABERTA
        }

        this.tarefas.push(tarefa);
        return tarefa;
    }


    deletar(id: string): void {
        this.tarefas = this.tarefas.filter(t => t.id !== id);
    }



}