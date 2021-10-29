import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { SuccessInterceptor } from '../common/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getAllCats() {
    return 'all cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) id: number) {
    return `cat ${id}`;
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updateParserCat() {
    return 'update parser';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete';
  }
}
