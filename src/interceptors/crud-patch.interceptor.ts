import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class CrudPatchInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: any = context.switchToHttp().getRequest();
    if (req.method === 'PATCH') {
      req.body = { ...req.body, ...req.params };
    }

    return next.handle();
  }
}
