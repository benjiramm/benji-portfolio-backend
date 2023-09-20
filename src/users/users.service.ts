import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { User } from './models/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: User) {
    const foundUser = await this.getUser(user.email);
    if (foundUser) {
      return foundUser;
    }
    return await this.userRepository.save(user);
  }

  async getUser(email: string) {
    const user: User = await this.userRepository.findOne({
      select: ['id', 'isAdmin', 'email'],
      where: { email },
    });
    return user;
  }

  async isAdmin(email: string) {
    const user = await this.getUser(email);
    if (user) {
      return user.isAdmin;
    }
    throw new NotFoundException('this user does not exist');
  }
}
