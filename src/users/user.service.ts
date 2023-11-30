// src/users/user.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    const { name, password } = user;

    if (!name || !password) {
      throw new BadRequestException('Name and password are required');
    }
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    const allUsers = this.userRepository.find();
    return allUsers;
  }
}
