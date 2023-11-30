// src/website/website.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { WebsiteService } from './website.service';
import { Website } from './website.entity';
import { Request } from '@nestjs/common';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get('/user_by_id')
  async getWebsiteInfo(@Request() req): Promise<Website> {
    const id = req['headers']?.id;
    if (!id) {
      throw new BadRequestException('id is required');
    }
    return this.websiteService.getWebsiteInfo(id);
  }

  @Post()
  async setWebsiteInfo(@Body() websiteInfo: Website): Promise<Website> {
    const { websiteName, websiteDescription, targetUser } = websiteInfo;
    if (!websiteName) {
      throw new BadRequestException('websiteName is required');
    }
    if (!websiteDescription) {
      throw new BadRequestException('websiteDescription is required');
    }
    if (!targetUser) {
      throw new BadRequestException('targetUser is required');
    }
    return this.websiteService.setWebsiteInfo(websiteInfo);
  }
}
