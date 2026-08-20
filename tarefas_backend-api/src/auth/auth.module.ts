import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioEntity } from '../../src/tarefas/entities/usuario.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'CHAVE_SECRETA_SUPER_SEGURA', // Chave para assinar o token
      signOptions: { expiresIn: '1d' },      // Token expira em 1 dia
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}