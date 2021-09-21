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
  UseInterceptors,
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter'
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe'
import { SuccessInterceptor } from '../common/interceptors/success.interceptor'

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    // throw new HttpException('api is broken', 401)
    return { cats: 'all cats' }
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
