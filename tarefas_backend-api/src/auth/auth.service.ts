import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UsuarioEntity } from '../usuarios/entities/usuario.entity';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepo: Repository<UsuarioEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {

    // 1. Limpa o email
    const emailLimpo = email.trim().toLowerCase();

    console.log('--- LOGIN ---');
    console.log('Email:', emailLimpo);

    // 2. Procura o usuário no banco
    const user = await this.usuarioRepo.findOne({
      where: {
        email: emailLimpo,
      },
    });

    // 3. Usuário não encontrado
    if (!user || !user.senha) {
      throw new UnauthorizedException(
        'E-mail ou senha inválidos',
      );
    }

    // 4. Compara senha digitada com hash do banco
    const senhaValida = await bcrypt.compare(
      senha,
      user.senha,
    );

    console.log('Senha válida:', senhaValida);

    // 5. Senha incorreta
    if (!senhaValida) {
      throw new UnauthorizedException(
        'E-mail ou senha inválidos',
      );
    }

    // 6. Dados que serão colocados dentro do JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // 7. Cria o token
    const token = this.jwtService.sign(payload);

    console.log('JWT criado com sucesso');

    // 8. Retorna para o Angular
    return {
      access_token: token,
      role: user.role,
    };
  }
}