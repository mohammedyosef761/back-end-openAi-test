//unit test

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.services';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const mockUserService = {
      getAllUsers: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        { id: 1, name: 'Test User', password: 'password', websites: [] },
      ];
      jest.spyOn(userService, 'getAllUsers').mockResolvedValue(result);

      expect(await controller.getAllUsers()).toBe(result);
    });
  });

  describe('setUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        password: 'password',
      };
      const result: CreateUserDto = createUserDto; // Adjust as needed

      jest.spyOn(userService, 'create').mockResolvedValue(result);

      expect(await controller.setUser(createUserDto)).toBe(result);
    });
  });
});
