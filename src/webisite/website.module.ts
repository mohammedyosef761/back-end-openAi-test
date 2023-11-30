import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './website.entity';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { User } from 'src/users/user.entity';
import { UserController } from 'src/users/user.controller';
import { UsersModule } from 'src/users/user.module';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Website, User])],
  controllers: [WebsiteController, UserController],
  providers: [WebsiteService, UserService],
})
export class WebsiteModule {}
