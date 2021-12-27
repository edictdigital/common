import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface ClassConstructor {
  new(...args: any[]): {}
}

export function SecondSerialize(dto: ClassConstructor) {
  return UseInterceptors(new SecondSerializeInterceptor(dto));
}

class SecondSerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) { }

  intercept(_context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler. 
    // console.log(context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out.
        // console.log(data);

        if (Array.isArray(data)) {
          return data.map(e => this.dto.fromResponseDto(e));
        } else {
          return this.dto.fromResponseDto(data);
        }
      })
    );
  }
}