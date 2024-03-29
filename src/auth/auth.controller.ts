import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../models/user.dto';
//  /api/users
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post()
  // register(@Body(ValidationPipe) authData: RegisterDTO) {
  //   return this.authService.register(authData);
  // }

  @Post('/login')
  login(@Body(ValidationPipe) authData: LoginDTO) {
    return this.authService.login(authData);
  }
}
