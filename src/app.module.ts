import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './webisite/website.entity';
import { WebsiteModule } from './webisite/website.module';
import { UsersModule } from './users/user.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'misraj_test',
      entities: [Website, User],
      synchronize: true,
    }),
    WebsiteModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('process.env : ', process.env.DB_DATABASE);
    // console.log('PWD : ', process.env.PWD);
    // console.log('NODE_ENV : ', process.env.NODE_ENV);
  }
}
