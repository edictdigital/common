import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BaseEntity, DeepPartial } from "typeorm";
import { IBaseService } from "./base.service";


export class BaseController<T extends BaseEntity> {
  constructor(private readonly service: IBaseService<T>) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    return this.service.getById(id);
  }

  @Post()
  async create<E extends DeepPartial<T>>(@Body() entity: E): Promise<T> {
    return this.service.create(entity);
  }

  @Patch(':id')
  async update<E extends DeepPartial<T>>(@Param('id') id: string, @Body() entity: E): Promise<T> {
    return this.service.update(id, entity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.service.delete(id);
  }
}