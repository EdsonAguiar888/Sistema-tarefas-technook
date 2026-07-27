

import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
 
export class CriarTarefaDto {
  @IsString()
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @MaxLength(100)
  titulo!: string;

  @IsString()
  descricao!: string;

}




