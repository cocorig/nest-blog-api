import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from '../models/user.dto';
//  /api/users
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body(ValidationPipe) authData: RegisterDTO) {
    return this.authService.register(authData);
  }

  @Post('/login')
  login(@Body(ValidationPipe) authData: LoginDTO) {
    return this.authService.login(authData);
  }
}

// Authentication

// POST api/users/login
/* ex json
{
  "user": {
      "email": "coco@test.com",
      "password" : "testxxxx"
    }
}
*/
// Registration
// POST api/users
/* ex json
{
  "user": {
     "username": "coco",
      "email": "coco@test.com",
      "password" : "testxxxx"
    }
}
*/
