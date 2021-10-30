import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { SuccessInterceptor } from '../common/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @ApiOperation({ summary: 'get current cat' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiOperation({ summary: 'signup' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 200,
    description: 'Request Success',
    type: ReadOnlyCatDto,
  })
  @Post()
  async signup(@Body() catRequestDto: CatRequestDto) {
    return await this.catService.signup(catRequestDto);
  }

  @ApiOperation({ summary: 'login' })
  @Post('login')
  login() {
    return 'login';
  }

  @ApiOperation({ summary: 'logout' })
  @Post('logout')
  logout() {
    return 'logout';
  }

  @ApiOperation({ summary: 'upload cat image' })
  @Post('upload/img')
  uploadCatImg() {
    return 'uploadImg';
  }
}
