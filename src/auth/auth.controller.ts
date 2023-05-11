import { Body, Controller, Post } from '@nestjs/common';
import type { AuthService } from './auth.service';
import type { CreateUserDto } from './dto/create-user.dto';
import type { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}
  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(createUserDto)
  }
}
