// Generic Base Controller and Service for CRUD
import { BaseController } from "./base-crud/base.controller";
import { BaseService, IBaseService } from "./base-crud/base.service";
import { MainEntity } from "./base-crud/main.entity";
import { SerializeInterceptor } from "./interceptors/serialize.interceptor";
import { Serialize } from "./decorators/serialize.decorator";

export {
  BaseController,
  BaseService,
  IBaseService,
  MainEntity,
  SerializeInterceptor,
  Serialize,
};