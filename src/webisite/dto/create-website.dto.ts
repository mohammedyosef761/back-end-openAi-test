// src/website/dto/create-website.dto.ts

import { IsString, IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateWebsiteDto {
  @IsString()
  @IsNotEmpty()
  websiteName: string;

  @IsString()
  @IsNotEmpty()
  websiteDescription: string;

  @IsString()
  @IsNotEmpty()
  targetUser: string;

  @IsNotEmpty()
  ai_description: string;
}
