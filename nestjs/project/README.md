# Start NestJS

- import 부분이 노란색으로 밑줄 쳐져 있을 때 대처법 - `tsconfigRootDir` 추가

  ![image-20210905191046951](README.assets/image-20210905191046951.png)

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
- ***<u>`exports`: 이 모듈에서 제공하고 이 모듈을 임포트하는 다른 모듈에서 사용할 수 있어야 하는 프로바이더의 하위집합</u>*** =>  다른 모듈로 export 한다 

