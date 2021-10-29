import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getAllCats() {
    return 'all cat';
  }

  @Get(':id')
  getCat() {
    return 'cat';
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
