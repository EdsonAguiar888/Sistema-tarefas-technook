import { SetMetadata } from '@nestjs/common';
import { Role } from '../usuarios/entities/usuario.entity';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);