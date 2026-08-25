import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { UsuarioEntity } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [

    TypeOrmModule.forFeature([
      UsuarioEntity,
    ]),

    PassportModule,

    JwtModule.register({
      secret: 'MINHA_CHAVE_SUPER_SECRETA_123',

      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    JwtStrategy,
  ],

  exports: [
    AuthService,
    PassportModule,
    JwtModule,
  ],
})
export class AuthModule {}