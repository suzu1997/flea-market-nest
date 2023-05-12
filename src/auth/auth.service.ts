import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import type { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) { }
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }
}
