import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
import { CatsService } from './cats.service'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    throw new HttpException('api is broken', 401)
  }

  @Get(':id')
  getCat() {
    return 'cat'
  }

  @Post()
  createCat() {
    return 'create cat'
  }

  @Put(':id')
  updateCat() {
    return 'update cat'
  }

  @Patch(':id')
  updatePartialCat() {
    return
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat'
  }
}
