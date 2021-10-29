# Start NestJS

- import 부분이 노란색으로 밑줄 쳐져 있을 때 대처법 - `tsconfigRootDir` 추가

## Controller

- 클라이언트 요청을 처리하고 응답을 반환한다
- 유지보수, 가독성을 위해 비즈니스 로직인 provider 와 라우팅 처리를 담당하는 controller 로 나눈다
- [한국어 문서](https://docs.nestjs.kr/controllers)

## Provider, 의존성 주입

- `AppService` 는 공급자로 의존성 주입이 가능하다
- [한국어 문서](https://docs.nestjs.kr/providers)

```typescript
@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 의존성 주입

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
```

```typescript
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
```

```typescript
// provider 등록
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Modules and Capsulation

[nestjs module](https://docs.nestjs.kr/modules)

- `@Module` 데코레이터로 주석이 달린 클래스이다

- `nest g mo [모듈 이름]`: 모듈 생성
- nest 에서 모듈은 기본적으로 싱글톤 이므로 여러 모듈간에 쉽게 프로파이더의 동일한 인스턴스를 공유합니다
- 모든 모듈은 자동으로 공유 모듈이다
- `providers`: Nest 인젝터에 의해 인스턴스화 되고 적어도 이 모듈에서 공유될 수 있는 프로바이더
- `controllers`: 인스턴스화 되어야 하는 이 모듈에 정의된 컨트롤러 세트
- `imports`: 이 모듈에 필요한 프로바이더를 내보내는 가져온 모듈 목록
- **_<u>`exports`: 이 모듈에서 제공하고 이 모듈을 임포트하는 다른 모듈에서 사용할 수 있어야 하는 프로바이더의 하위집합</u>_** => 다른 모듈로 export 한다

## 미들웨어

[nestjs module](https://docs.nestjs.kr/middleware)

- 미들웨어는 라우트 핸들어 이전에 호출되는 함수이다
- nest 미들웨어는 기본적으로 express 미들웨어와 동일하다
  - 모든 코드를 실행한다
  - 요청 및 응답 객체를 변경한다
  - 요청 - 응답주기를 종료한다
  - 스택의 next 미들웨어 함수를 호출한다

```typescript
// logger 미들웨어

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(`${req.ip} ${req.method} ${res.statusCode}`)
    })
    next()
  }
}

// 미들웨어 적용하기 app.module.ts, 모든 요청에 적용
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
```

## 필터와 파이프

### exception filter

[nestjs filter](https://docs.nestjs.kr/exception-filters)

- 코드에서 예외를 처리하지 않으면 레이어에서 예외를 포착하여 적절한 사용자 친화적인 응답을 자동으로 내보낸다
- `HttpExeption` 유형의 예외를 처리하는 내장 전역 예외 필터에 의해 수행된다

```typescript

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getResponse<Request>()
    const status = exception.getStatus()
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] }

    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      })
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...error,
      })
    }
  }
}

// controller 에서의 적용

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCats() {
    throw new HttpException('api is broken', 401)
  }
```

### Pipes

- 파이프 사용사례
  1. 변환 : 입력데이터를 원하는 형식으로 변환한다
  2. 유효성 검사: 입력 데이터를 평가하고 유효한 경우 변경하지 않고 전달한다. 그렇지 않으면 예외를 발생시킨다

```typescript
// 커스텀 파이프
@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new HttpException('value > 0', 400)
    }
    return value
  }
}
```

## Interceptor

- 인터셉터는 AOP Aspect Oriented Programming 관점 지향 기술에서의 기능이 있다
  1. 메소드 실행 전/후 추가 로직 바인딩
  2. 함수에서 반환된 결과 변환
  3. 함수에서 던저진 예외 변환
  4. 기본 기능 동작 확장
  5. 특정 조건에 따라 기능을 완전 재정의

```typescript
@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      }))
    )
  }
}
```

## Request lifecycle
