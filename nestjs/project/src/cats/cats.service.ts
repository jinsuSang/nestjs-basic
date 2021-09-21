import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Cat } from './cat.entity'
import { CatRequestDto } from './dto/cats.request.dto'
import * as bcrypt from 'bcrypt'
import { ReadonlyCatDto } from './dto/cat.dto'

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async signUp(body: CatRequestDto): Promise<ReadonlyCatDto> {
    const { email, name, password } = body
    const isExisted = await this.catsRepository.findOne({ email: email })

    if (isExisted) {
      throw new UnauthorizedException('Already Existed')
    }

    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    const cat = this.catsRepository.save({
      email,
      name,
      password: hash,
    })
    return {
      id: (await cat).id,
      email: (await cat).email,
      name: (await cat).name,
    }
  }
}
