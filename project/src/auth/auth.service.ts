import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CatsRepository } from '../cats/cats.repository';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일, 비밀번호 확인 필요');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일, 비밀번호 확인 필요');
    }

    const payload = {
      email,
      sub: cat.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
