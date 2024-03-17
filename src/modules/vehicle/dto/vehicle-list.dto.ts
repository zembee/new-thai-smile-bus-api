import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsOptional, IsString, Max } from 'class-validator'
import { Type } from 'class-transformer'

export default class VehicleListDto {
  @ApiProperty({
    description: 'ชื่อพาหนะหรือป้ายทะเบียน',
    required: false,
    example: '',
  })
  @IsOptional()
  @IsString()
  search: string

  @ApiProperty({
    description: 'ประเภท',
    required: false,
    enum: ['bus', 'taxi', 'van'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['bus', 'taxi', 'van'])
  type: string

  @ApiProperty({
    description: 'page',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @Type(() => Number)
  page: number

  @ApiProperty({
    description: 'perPage',
    required: true,
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @Max(100)
  perPage: number
}
