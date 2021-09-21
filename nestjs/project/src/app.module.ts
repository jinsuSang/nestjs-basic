import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cat } from './cats/cat.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [Cat],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
