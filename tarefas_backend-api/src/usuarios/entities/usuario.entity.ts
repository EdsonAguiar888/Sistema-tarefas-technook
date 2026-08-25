import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Enum que define os papéis de acesso no sistema
export enum Role {
  ADMIN = 'admin',
  USUARIO = 'usuario',
}

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  senha?: string; // Será salva criptografada com bcrypt

  @Column({ type: 'enum', enum: Role, default: Role.USUARIO })
  role?: Role; // Mapeia o perfil (admin ou usuario)
}