import { Injectable } from "@nestjs/common";
import { BaseEntity, DeepPartial, Repository } from "typeorm";

@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.find();
  }

  async getById(id: string): Promise<T> {
    return this.repository.findOne(id);
  }

  async update(id: string, entity: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, entity);
    return this.getById(id);
  }

  async create<E extends DeepPartial<T>>(entity: E): Promise<T> {
    return await this.repository.create(entity).save();
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }  
}


export interface IBaseService<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  update(id: string, entity: DeepPartial<T>): Promise<T>;
  create(entity: DeepPartial<T>): Promise<T>;
  delete(id: string): Promise<any>;
}