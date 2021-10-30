import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    return await this.catModel.exists({ email });
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  // async findCatByIdWithoutPassword(
  //   catId: string,
  // ): Promise<CatCurrentDto | null> {
  //   const cat = await this.catModel.findById(catId).select('-password');
  //   return cat;
  // }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }
}
