import { Cat } from '../cat.entity'
import { PickType } from '@nestjs/swagger'

export class ReadonlyCatDto extends PickType(Cat, [
  'id',
  'email',
  'name',
] as const) {}
