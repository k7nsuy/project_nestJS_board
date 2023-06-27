// auth.decorators.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/APIs/auth/jwt/jwt-payload.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
