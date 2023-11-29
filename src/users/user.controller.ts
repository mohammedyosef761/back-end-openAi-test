// src/website/website.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';

import { Request } from '@nestjs/common';
import { UserService } from './user.services';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Post()
  async setWebsiteInfo(@Body() user: User): Promise<User> {
    console.log('user', user);

    return this.userService.create(user);
  }
}
