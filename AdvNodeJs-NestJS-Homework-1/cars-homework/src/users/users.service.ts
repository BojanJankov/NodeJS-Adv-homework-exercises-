import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  getAllUsers() {
    return this.userRepo.find({});
  }

  getUserbyId(id: string) {
    const foundUser = this.userRepo.findOneBy({ id });

    if (!foundUser) throw new NotFoundException('User Not Found');

    return foundUser;
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  createuser(userData: CreateUserDto) {
    return this.userRepo.save(userData);
  }

  async updateUser(id: string, updateUserData: UpdateUserDto) {
    const foundUser = await this.getUserbyId(id);

    Object.assign(foundUser, updateUserData);

    await this.userRepo.save(foundUser);
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const foundUser = await this.getUserbyId(id);

    if (!foundUser.refreshToken) {
      foundUser.refreshToken = refreshToken;
    }

    await this.userRepo.save(foundUser);
  }

  async deleteUser(id: string) {
    const foundUser = await this.getUserbyId(id);

    await this.userRepo.remove(foundUser);
  }
}
