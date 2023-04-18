import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import mime from "mime-types";
import {Observable, map} from "rxjs";
import {TransferFileTypeEnum} from "../enums/transfer-file-type.enum";


@Injectable()
export class ExportContentTypeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req: any = context.switchToHttp().getRequest();
        const res: any = context.switchToHttp().getResponse();

        if (
            req.query.fileExt &&
            Object.values(TransferFileTypeEnum).includes(req.query.fileExt.toLowerCase())
        ) {
            res.headers["Content-Type"] = mime.contentType(req.query.fileExt.toLowerCase());

        }
        return next.handle();
    }
}
