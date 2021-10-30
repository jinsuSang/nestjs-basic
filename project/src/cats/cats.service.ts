import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signup(catRequestDto: CatRequestDto) {
    const { email, name, password } = catRequestDto;
    const isExisted = await this.catModel.exists({ email });

    if (isExisted) {
      throw new UnauthorizedException('Already Existed Cat');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const cat = await this.catModel.create({
      email,
      name,
      password: hash,
    });

    return cat.readonlyData;
  }
}
