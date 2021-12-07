import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(_context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler. 
    // console.log(context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out.
        // console.log(data);

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}