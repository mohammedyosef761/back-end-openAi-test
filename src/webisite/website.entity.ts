// src/website/website.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Website {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  websiteName: string;

  @Column()
  websiteDescription: string;

  @Column()
  ai_description: string;

  @Column()
  targetUser: number;
}
