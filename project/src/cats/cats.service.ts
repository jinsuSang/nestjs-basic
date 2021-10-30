import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signup(catRequestDto: CatRequestDto) {
    const { email, name, password } = catRequestDto;
    const isExisted = await this.catsRepository.existsByEmail(email);

    if (isExisted) {
      throw new UnauthorizedException('Already Existed Cat');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hash,
    });

    return cat.readonlyData;
  }
}
