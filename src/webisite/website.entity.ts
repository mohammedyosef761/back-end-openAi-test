// src/website/website.entity.ts
import { User } from '../users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.websites, { cascade: true })
  @JoinColumn({ name: 'targetUserId' })
  targetUser: User;

  // @Column()
  // targetUser: number;
}
