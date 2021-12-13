import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface ClassConstructor {
  new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) { }

  intercept(_context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler. 
    // console.log(context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out.
        // console.log(data);

        if (Array.isArray(data)) {
          return data.map(e => this.dto.fromEntity(e));
        } else {
          return this.dto.fromEntity(data);
        }

        // return plainToInstance(this.dto, data, {
        //   excludeExtraneousValues: true,
        // });
      })
    );
  }
}