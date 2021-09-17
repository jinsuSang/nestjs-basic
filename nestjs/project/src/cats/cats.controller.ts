import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common'
import { CatsService } from './cats.service'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    return 'all cats'
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
