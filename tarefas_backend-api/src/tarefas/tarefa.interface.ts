


export interface Tarefa {
    id: string;
    titulo: string;
    descricao: string;
    status: StatusTarefa;

}


export enum StatusTarefa {
    ABERTA = 'ABERTA',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDA = 'CONCLUIDA'
}











