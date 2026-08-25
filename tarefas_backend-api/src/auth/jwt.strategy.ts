import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy) {

  constructor() {

    super({

      // Procura:
      // Authorization: Bearer TOKEN
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Token expirado será rejeitado
      ignoreExpiration: false,

      // Deve ser igual ao JwtModule
      secretOrKey:
        'MINHA_CHAVE_SUPER_SECRETA_123',
    });
  }

  async validate(payload: any) {

    console.log('JWT VALIDADO:', payload);

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}