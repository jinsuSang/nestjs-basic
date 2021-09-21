import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Cat {
  @ApiProperty({
    example: 325,
    description: 'id',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({
    example: 'test@test.com',
    description: 'email',
    required: true,
  })
  @Column({
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: 'name',
    description: 'name',
    required: true,
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({
    example: 'http://123456',
    description: 'image url',
  })
  @Column({
    nullable: true,
  })
  @IsString()
  imgUrl: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
