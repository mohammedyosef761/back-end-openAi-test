// src/users/user.entity.ts
import { Website } from '../webisite/website.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Website, (website) => website.targetUser)
  websites: Website[];
}
