

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tarefas')
export class TarefaEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  titulo?: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column({ default: 'ABERTA' })
  status?: string;
}