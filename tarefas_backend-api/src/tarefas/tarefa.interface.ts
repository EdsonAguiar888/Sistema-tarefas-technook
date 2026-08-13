


export interface Tarefa {
    id: string;
    titulo: string;
    descricao: string;
    status: StatusTarefa;
    prioridade: string;
}


export enum StatusTarefa {
    ABERTA = 'ABERTA',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDA = 'CONCLUIDA'
}











