import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"







@Entity('usuarios')
export class UsuarioEntity {    
    
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    
    @Column({ unique: true })
    email?: string;
    
    @Column()
    senha?: string;  // Será salva como hash criptografado (bcrypt)
    
    
}