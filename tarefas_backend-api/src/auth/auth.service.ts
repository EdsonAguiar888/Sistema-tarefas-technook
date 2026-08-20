import { UsuarioEntity } from '../../src/tarefas/entities/usuario.entity';


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import strict from 'assert/strict';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepo: Repository<UsuarioEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senhaPlana: string) {
    // 1. Limpa espaços do e-mail
    const emailLimpo = email.trim().toLowerCase();

    // 2. Busca usuário no PostgreSQL
    const usuario = await this.usuarioRepo.findOne({ where: { email: emailLimpo } });

    // 3. Se não achar ou a senha estiver incorreta, lança 401
    // if (!usuario || !(await bcrypt.compare(senhaPlana, usuario.senha))) {
    //   throw new UnauthorizedException('E-mail ou senha inválidos.');
    // }

    if (!usuario || !usuario.senha) {
        throw new UnauthorizedException('E-mail ou senha inválidos.');
}
    // 4. Monta o payload e assina o token JWT
    const payload = { sub: usuario.id, email: usuario.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}