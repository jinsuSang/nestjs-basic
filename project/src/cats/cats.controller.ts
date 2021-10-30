import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorators';
import { CatCurrentDto } from './dto/cat.current.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'get current cat' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: CatCurrentDto) {
    return cat.readonlyData;
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
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.jwtLogin(loginRequestDto);
  }

  @ApiOperation({ summary: 'upload cat image' })
  @Post('upload/img')
  uploadCatImg() {
    return 'uploadImg';
  }
}
