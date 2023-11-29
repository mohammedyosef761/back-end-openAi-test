// src/website/website.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from './website.entity';
import axios from 'axios';
import { CONSTANTS } from 'env/constants';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,
  ) {}

  private readonly openAiApiUrl = CONSTANTS.OPEN_API_URL; // Update with the correct API endpoint
  private readonly openAiApiKey = CONSTANTS.OPEN_API_KEY;
  // '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';

  async generateIslamicContent(userInput: string): Promise<string | any> {
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
              content: `Generate Islamic content related to: ${userInput} without title`,
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
      if (error.code === 'EAI_AGAIN') {
        // Retry the request after a short delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        console.error(error);
        throw new Error('Failed to generate content');
      }
    }
  }

  async getWebsiteInfo(id: string | number): Promise<Website> {
    const data = this.websiteRepository.findOne({
      where: { targetUser: +id },
    });
    return data;
  }

  async getAllUsers(): Promise<Website[]> {
    const allUsers = this.websiteRepository.find();
    return allUsers;
  }

  async setWebsiteInfo(websiteInfo: Website): Promise<Website | any> {
    await this.websiteRepository.delete({
      targetUser: websiteInfo?.targetUser,
    });

    // const ai_data = 'there are a problem in the open ai key';
    const ai_data = await this.generateIslamicContent(
      websiteInfo?.websiteDescription,
    );
    console.log('aiDataaa', ai_data);
    return this.websiteRepository.save({
      ...websiteInfo,
      ai_description: ai_data,
    });
  }
}
