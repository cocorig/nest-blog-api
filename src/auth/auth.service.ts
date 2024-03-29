import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/models/user.dto';

@Injectable()
export class AuthService {
  // 예시 data
  private mockUser = {
    email: 'coco@test.com',
    token: 'jwt.token.here',
    username: 'coco',
    bio: 'I work at statefarm',
    image: null,
  };

  // register(authData: RegisterDTO) {

  //   return this.mockUser;
  // }

  login(authData: LoginDTO) {
    if (authData.email === this.mockUser.email) {
      return this.mockUser;
    }
    throw new UnauthorizedException(
      '이메일 혹은 비밀번호가 일치하지 않습니다.',
    );
  }
}
