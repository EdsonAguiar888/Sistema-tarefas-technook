import {
  Injectable,
  CanActivate,
  ExecutionContext
} from '@nestjs/common';

import {
  Reflector
} from '@nestjs/core';

import {
  Role
} from '../usuarios/entities/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean {

    const requiredRoles =
      this.reflector.getAllAndOverride<Role[]>(
        'roles',
        [
          context.getHandler(),
          context.getClass()
        ]
      );

    if (!requiredRoles) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user =
      request.user;

    if (!user) {
      return false;
    }

    console.log(
      '[ROLES GUARD] Usuário:',
      user.email
    );

    console.log(
      '[ROLES GUARD] Role:',
      user.role
    );

    console.log(
      '[ROLES GUARD] Permitidos:',
      requiredRoles
    );

    return requiredRoles.includes(
      user.role
    );
  }
}