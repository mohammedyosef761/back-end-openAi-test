// src/website/website.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from './website.entity';
import axios from 'axios';
import { User } from 'src/users/user.entity';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly openAiApiUrl = process.env.OPEN_API_URL;
  private readonly openAiApiKey = process.env.OPEN_API_KEY;

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
              content: `Generate Islamic content as introduction for website related to: ${userInput} in 50 words`,
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
    const user = await this.userRepository.findOne({
      where: { id: +id },
    });
    const data = this.websiteRepository.findOne({
      where: { targetUser: user },
    });

    return data;
  }

  async getAllUsers(): Promise<Website[]> {
    const allUsers = this.websiteRepository.find();
    return allUsers;
  }

  async setWebsiteInfo(websiteInfo: Website): Promise<Website | any> {
    const user = await this.userRepository.findOne({
      where: { id: +websiteInfo?.targetUser },
    });
    await this.websiteRepository.delete({
      targetUser: user,
    });

    // const ai_data = 'there are a problem in the open ai key';
    const ai_data = await this.generateIslamicContent(
      websiteInfo?.websiteDescription,
    );

    // console.log('ai_data', ai_data);

    return this.websiteRepository.save({
      ...websiteInfo,
      ai_description: ai_data,
    });
  }
}
