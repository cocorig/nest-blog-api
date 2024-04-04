import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from '../models/user.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body() authData: RegisterDTO) {
    return this.authService.register(authData);
  }

  @Post('/login')
  login(@Body() authData: LoginDTO) {
    return this.authService.login(authData);
  }
}
/*
1. Authentication

POST api/users/login

{
  "user": {
      "email": "coco@test.com",
      "password" : "testxxxx"
    }
}

2. Registration

POST api/users

{
  "user": {
      "username": "coco",
      "email": "coco@test.com",
      "password" : "testxxxx"
    }
}

3.  Get Current User
GET /api/user

4. Update User
PUT /api/user

{
  "user":{
    "email": "coco@test.com",
    "bio": "I like to skateboard",
    "image": "https://nest.jpg"
  }
}
 */
