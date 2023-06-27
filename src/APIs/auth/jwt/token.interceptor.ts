import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = '여기에 토큰을 가져오는 로직을 작성해주세요'; // 클라이언트에서 저장한 토큰을 가져오는 로직을 구현해야 합니다.

    request.headers['Authorization'] = `Bearer ${token}`;
    return next.handle();
  }
}
