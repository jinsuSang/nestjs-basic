import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { HttpExceptionFilter } from '../http-exception.filter'
import { PositiveIntPipe } from '../positive-int.pipe'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCats() {
    throw new HttpException('api is broken', 401)
  }

  @Get(':id')
  getCat(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
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
