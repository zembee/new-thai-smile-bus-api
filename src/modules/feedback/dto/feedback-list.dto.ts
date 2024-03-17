import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export default class FeedbackListDto {
  @ApiProperty({
    description: 'title , description',
    required: false,
    example: '',
  })
  @IsOptional()
  @IsString()
  search: string

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
  perPage: number
}
