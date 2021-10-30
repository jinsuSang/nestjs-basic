# DTO

### Cat Schema 

```typescript
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'username@email.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'jinsu',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12345679',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readonlyData: {
    id: string;
    eamil: string;
    name: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readonlyData').get(function () {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});

```

### ReadOnlyCatDto

- `PickType` 을 사용해 프로퍼트를 선택하여 추가할 수 있음

```typescript
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '13478923',
    description: 'id',
    required: true,
  })
  readonly id: string;
}
```

