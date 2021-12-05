import { BaseEntity, Column, CreateDateColumn } from "typeorm";

export class MainEntity extends BaseEntity {
  @Column({ name: 'created_by', default: 0 })
  createdBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_by', default: 0 })
  updatedBy: number;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}