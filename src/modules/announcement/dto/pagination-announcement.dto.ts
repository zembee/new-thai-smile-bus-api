import { ApiProperty } from '@nestjs/swagger'
import {
  IsNumber,
  IsOptional,
} from 'class-validator'
import { Type } from 'class-transformer'

export default class PaginationAnnouncementDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number

  @ApiProperty({
    type: Number,
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  perPage: number
}
