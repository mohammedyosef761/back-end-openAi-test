import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './webisite/website.entity';
import { WebsiteModule } from './webisite/website.module';
import { UsersModule } from './users/user.module';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';

const envFilePath =
  process.env.PWD == 'https://difficult-calf-nightshirt.cyclic.app'
    ? 'prod'
    : process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/${envFilePath}.env`],
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
    console.log('envFilePath ', envFilePath);
    console.log('process.en.pwd', process.env.PWD);
    console.log('process.env : ', process.env.DB_NAME);
    console.log(
      process.env.DB_HOST,
      +process.env.DB_PORT,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      process.env.DB_DATABASE,
    );
    console.log('process.en.pwd', process.env.PWD);
    // console.log('PWD : ', process.env.PWD);
    // console.log('NODE_ENV : ', process.env.NODE_ENV);
  }
}
