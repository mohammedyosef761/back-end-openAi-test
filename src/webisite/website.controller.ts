// src/website/website.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { Website } from './website.entity';
import { Request } from '@nestjs/common';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get('/user_by_id')
  async getWebsiteInfo(@Request() req): Promise<Website> {
    const id = req['headers']?.id;
    return this.websiteService.getWebsiteInfo(id);
  }

  @Post()
  async setWebsiteInfo(@Body() websiteInfo: Website): Promise<Website> {
    console.log('webSite', websiteInfo);

    return this.websiteService.setWebsiteInfo(websiteInfo);
  }
}
