import { Injectable } from '@nestjs/common';

// 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
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
