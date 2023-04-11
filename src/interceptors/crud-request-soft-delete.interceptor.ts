import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class CrudRequestSoftDeleteInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: any = context.switchToHttp().getRequest();

    if (req.query.softDelete) {
      req["NESTJSX_PARSED_CRUD_REQUEST_KEY"].options.query.softDelete = true;
      req["NESTJSX_PARSED_CRUD_REQUEST_KEY"].parsed.includeDeleted = 1;
    }

    return next.handle();
  }
}
