import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token);
      const username = payload.username;

      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user;
      return requiredRoles.some(
        (role) => role.toUpperCase() === user.role.toUpperCase(),
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
