



import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../usuarios/entities/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Busca quais perfis têm acesso ao método da rota
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Se não houver restrição, permite acesso
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role); // Valida se o perfil bate
  }
}