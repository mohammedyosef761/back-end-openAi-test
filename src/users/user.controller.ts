// src/website/website.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';

import { Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Post()
  async setUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.create(user);
  }
}
