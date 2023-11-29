// src/website/website.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from './website.entity';
import axios from 'axios';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,
  ) {}

  private readonly openAiApiUrl = 'https://api.openai.com/v1/chat/completions'; // Update with the correct API endpoint
  private readonly openAiApiKey =
    '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';
  //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
  async generateIslamicContent(userInput: string): Promise<string | any> {
    console.log('userInput', userInput);
    try {
      const response = await axios.post(
        this.openAiApiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: `Generate Islamic content related to: ${userInput} without title and just 50 words`,
            },
          ],
          temperature: 0.9,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.openAiApiKey}`,
          },
        },
      );
      return response?.data?.choices?.[0]?.message?.content;
    } catch (error) {
      console.error(
        'Error calling OpenAI API:',
        error.response?.status,
        error.response?.data,
      );
      throw new Error('Failed to generate content');
    }
  }

  async getWebsiteInfo(id: string | number): Promise<Website> {
    console.log('id in target va', id);
    const data = this.websiteRepository.findOne({
      where: { targetUser: +id },
    });
    console.log('data', data);
    return data;
  }

  async getAllUsers(): Promise<Website[]> {
    const allUsers = this.websiteRepository.find();
    console.log('allusers', allUsers);
    return allUsers;
  }

  async setWebsiteInfo(websiteInfo: Website): Promise<Website | any> {
    console.log('webSiteInfor', websiteInfo);
    await this.websiteRepository.delete({
      targetUser: websiteInfo?.targetUser,
    });

    const ai_data = await this.generateIslamicContent(
      websiteInfo?.websiteDescription,
    );

    console.log('webSiteInfo', websiteInfo);
    console.log('ai_data', ai_data);
    // return ai_data;
    return this.websiteRepository.save({
      ...websiteInfo,
      ai_description: ai_data,
    });
  }
}
